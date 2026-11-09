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

// Existing UI entry points now read the reusable published-only blog module.
export async function getArticles(options: ArticleFilterOptions = {}): Promise<Article[]> {
  const { listPosts } = await import('../blog/queries');
  const { postArticle } = await import('../blog/adapter');
  const result = await listPosts('en', 1, options.limit || 48, options.category && options.category !== 'all' ? options.category.toLowerCase() : undefined);
  let articles = result.posts.map(post => postArticle(post));
  if (options.query) {
    const query = options.query.trim().toLowerCase();
    articles = articles.filter(post => `${post.title} ${post.excerpt}`.toLowerCase().includes(query));
  }
  if (options.platform) articles = articles.filter(post => post.platform === options.platform);
  if (options.tag) articles = articles.filter(post => post.tags.includes(options.tag!));
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { getPost } = await import('../blog/queries');
  const { postArticle } = await import('../blog/adapter');
  const result = await getPost('en', slug);
  return result ? postArticle(result.post, result.document) : null;
}

export async function getLeadArticle(): Promise<Article | undefined> {
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
