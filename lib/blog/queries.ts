import 'server-only';
import { cache } from 'react';
import { connection } from 'next/server';
import { blogConfig } from './config';
import { readQuery } from './database';
import { assetIds, assetUrls, validateDocument } from './document';
import type { Asset, PostRow } from './types';


// Fixed identifiers only; all caller-supplied values are positional parameters.
const projection = `p.id, p.locale, p.title, p.slug, p.excerpt,
 p.content_schema_version, p.metadata_json, p.author_name,
 p.author_designation, p.author_avatar_url, to_jsonb(p)->>'author_description' AS author_description, p.published_at, p.updated_at,
 c.name AS category_name, c.slug AS category_slug,
 CASE WHEN a.id IS NULL THEN NULL ELSE jsonb_build_object(
 'id', a.id, 'public_url', a.public_url, 'media_type', a.media_type,
 'original_filename', a.original_filename, 'alt_text', a.alt_text,
 'caption', a.caption, 'width', a.width, 'height', a.height) END AS cover`;
const joins = `FROM public.blog_posts p
 LEFT JOIN public.blog_categories c ON c.id = p.category_id
 LEFT JOIN public.blog_assets a ON a.id = p.cover_asset_id`;
const supported = (locale: string) => blogConfig.locales.includes(locale);

export async function listPosts(locale: string, page = 1, pageSize = blogConfig.pageSize, category?: string) {
  if (!supported(locale)) return { posts: [] as PostRow[], hasNext: false, page: 1 };
  await connection();
  const boundedPage = Number.isSafeInteger(page) ? Math.min(blogConfig.maxPage, Math.max(1, page)) : 1;
  const size = Number.isSafeInteger(pageSize) ? Math.min(blogConfig.maxPageSize, Math.max(1, pageSize)) : blogConfig.pageSize;
  const filter = typeof category === 'string' ? category.slice(0, 160) : null;
  const rows = await readQuery(async sql => await sql.unsafe(
    `SELECT ${projection} ${joins}
     WHERE p.status = 'published' AND p.locale = $1
     AND ($2::text IS NULL OR c.slug = $2 OR lower(c.name) = lower($2))
     ORDER BY p.published_at DESC, p.id DESC LIMIT $3 OFFSET $4`,
    [locale, filter, size + 1, (boundedPage - 1) * size],
  )) as unknown as PostRow[];
  return { posts: rows.slice(0, size), hasNext: rows.length > size && boundedPage < blogConfig.maxPage, page: boundedPage };
}

// React cache only deduplicates within one server request. No cross-request
// content cache can continue exposing a post after an admin unpublishes it.
export const getPost = cache(async (locale: string, slug: string) => {
  if (!supported(locale) || !slug || slug.length > 200) return null;
  await connection();
  return readQuery(async sql => {
    const rows = await sql.unsafe(`SELECT ${projection}, p.content_json ${joins}
      WHERE p.status = 'published' AND p.locale = $1 AND p.slug = $2 LIMIT 1`, [locale, slug]) as unknown as PostRow[];
    const post = rows[0];
    if (!post) return null;
    const document = validateDocument(post.content_json, post.content_schema_version);
    const ids = assetIds(document);
    const urls = assetUrls(document);
    const assets = ids.length || urls.length ? await sql<Asset[]>`
      SELECT id, public_url, media_type, original_filename, alt_text, caption, width, height
      FROM public.blog_assets WHERE id = ANY(${sql.array(ids, 23)}::integer[])
        OR public_url = ANY(${sql.array(urls, 25)}::text[])
    ` : [];
    return { post, document, assets: [...assets] as Asset[] };
  });
});

export async function publishedIndex() {
  await connection();
  // Leave room for this site's non-blog URLs under the sitemap 50,000 URL limit.
  const rows = await readQuery(async sql => await sql<{ locale: string; slug: string; title: string, excerpt: string, updated_at: Date; published_at: Date }[]>`
    SELECT locale, slug, title, excerpt, updated_at, published_at FROM public.blog_posts
    WHERE status = 'published' AND locale = ANY(${sql.array([...blogConfig.locales])}::text[])
    ORDER BY published_at DESC, id DESC LIMIT 45001
  `);
  if (rows.length > 45000) throw new Error('Blog sitemap requires pagination before it can be served.');
  return rows;
}


export async function publishedCategories(locale: string) {
  if (!supported(locale)) return [];
  await connection();
  return readQuery(async sql => await sql<{name: string; slug: string}[]>`
    SELECT DISTINCT c.name, c.slug FROM public.blog_categories c
    JOIN public.blog_posts p ON p.category_id = c.id
    WHERE p.status = 'published' AND p.locale = ${locale} ORDER BY c.name
  `);
}
