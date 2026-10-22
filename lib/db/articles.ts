import { Article } from '../types';
import { INITIAL_ARTICLES } from './seed-data';
import { runNeonQuery } from './neon';

let articlesStore: Article[] = [...INITIAL_ARTICLES];

export interface ArticleFilterOptions {
  category?: string;
  tag?: string;
  platform?: string;
  query?: string;
  limit?: number;
}

export async function getArticles(options: ArticleFilterOptions = {}): Promise<Article[]> {
  const neonResults = await runNeonQuery<any>(`
    SELECT * FROM articles ORDER BY published_at DESC
  `);

  let list = neonResults && neonResults.length > 0
    ? neonResults.map(r => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        excerpt: r.excerpt,
        content: r.content,
        thumbnail: r.thumbnail || r.cover_image,
        coverImage: r.cover_image,
        category: r.category,
        platform: r.platform,
        author: r.author,
        authorAvatar: r.author_avatar,
        authorRole: r.author_role,
        publishedAt: r.published_at,
        readTime: Number(r.read_time),
        commentCount: r.comment_count,
        viewCount: r.view_count,
        tags: r.tags || [],
        isLead: r.is_lead,
        isBreaking: r.is_breaking
      } as Article))
    : [...articlesStore];

  if (options.category && options.category !== 'all') {
    list = list.filter(a => a.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options.platform && options.platform !== 'all') {
    const pLower = options.platform.toLowerCase();
    list = list.filter(a => a.platform && a.platform.toLowerCase().includes(pLower));
  }

  if (options.tag && options.tag !== 'all') {
    const tLower = options.tag.toLowerCase().replace('#', '');
    list = list.filter(a => a.tags.some(tag => tag.toLowerCase().includes(tLower)));
  }

  if (options.query && options.query.trim().length > 0) {
    const qLower = options.query.toLowerCase().trim();
    list = list.filter(a =>
      a.title.toLowerCase().includes(qLower) ||
      a.excerpt.toLowerCase().includes(qLower) ||
      a.tags.some(t => t.toLowerCase().includes(qLower))
    );
  }

  if (options.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const neonResult = await runNeonQuery<any>(
    'SELECT * FROM articles WHERE slug = $1 LIMIT 1',
    [slug]
  );

  if (neonResult && neonResult.length > 0) {
    const r = neonResult[0];
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle,
      excerpt: r.excerpt,
      content: r.content,
      thumbnail: r.thumbnail || r.cover_image,
      coverImage: r.cover_image,
      category: r.category,
      platform: r.platform,
      author: r.author,
      authorAvatar: r.author_avatar,
      authorRole: r.author_role,
      publishedAt: r.published_at,
      readTime: Number(r.read_time),
      commentCount: r.comment_count,
      viewCount: r.view_count,
      tags: r.tags || [],
      isLead: r.is_lead,
      isBreaking: r.is_breaking
    };
  }

  const found = articlesStore.find(a => a.slug === slug);
  return found || null;
}

export async function getLeadArticle(): Promise<Article> {
  const articles = await getArticles();
  const lead = articles.find(a => a.isLead);
  return lead || articles[0];
}

export async function getBreakingStories(limit = 4): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter(a => !a.isLead).slice(0, limit);
}

export async function incrementArticleViews(slug: string): Promise<void> {
  await runNeonQuery(
    'UPDATE articles SET view_count = view_count + 1 WHERE slug = $1',
    [slug]
  );
  const article = articlesStore.find(a => a.slug === slug);
  if (article) {
    article.viewCount += 1;
  }
}

export async function createArticle(article: Article): Promise<Article> {
  await runNeonQuery(
    `INSERT INTO articles (id, slug, title, subtitle, excerpt, content, cover_image, category, platform, author, published_at, read_time, comment_count, view_count, tags, is_lead, is_breaking)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
     ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title`,
    [
      article.id,
      article.slug,
      article.title,
      article.subtitle,
      article.excerpt,
      article.content,
      article.coverImage,
      article.category,
      article.platform,
      article.author,
      article.authorAvatar || '',
      article.authorRole || '',
      article.publishedAt,
      article.readTime,
      article.commentCount,
      article.viewCount,
      article.tags,
      article.isLead || false,
      article.isBreaking || false
    ]
  );

  const idx = articlesStore.findIndex(a => a.slug === article.slug);
  if (idx >= 0) {
    articlesStore[idx] = article;
  } else {
    articlesStore.unshift(article);
  }

  return article;
}
