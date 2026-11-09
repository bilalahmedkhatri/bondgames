import { createBaseMetadata } from '@/lib/seo';
import { blogPath, blogUrl } from './config';
import { postArticle } from './adapter';
import type { PostRow } from './types';

export function postSeo(post: PostRow) {
  const article = postArticle(post);
  const stored = post.metadata_json || {};
  const path = blogPath(post.locale, post.slug);
  const expected = blogUrl(post.locale, post.slug);
  // A stored canonical can never point to the admin or a different application.
  let canonicalPath = path;
  try {
    if (typeof stored.canonical_url === 'string' && new URL(stored.canonical_url).href === expected) canonicalPath = new URL(expected).pathname;
  } catch { /* Use this application's route. */ }
  const text = (value: unknown, fallback: string, max: number) => typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : fallback;
  return createBaseMetadata({
    title: text(stored.title, post.title, 300), description: text(stored.description, post.excerpt, 1000),
    path, canonicalPath, image: article.coverImage, imageAlt: post.cover?.alt_text || post.title,
    language: post.locale, authors: [{ name: post.author_name }],
    article: { type: 'BlogPosting', publishedAt: article.publishedAt, modifiedAt: new Date(post.updated_at).toISOString(), section: post.category_name || undefined },
  });
}
