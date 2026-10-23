import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/db/articles';
import { getGames } from '@/lib/db/games';
import { absoluteUrl, isPreview } from '@/lib/seo';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isPreview) return [];
  const [articles, games] = await Promise.all([getArticles(), getGames()]);
  const pages = ['/', '/news', '/games', '/hardware', '/deals', '/community', '/submit-post', '/advertise', '/media-kit', '/editorial-guidelines', '/affiliate-policy', '/contact', '/press', '/terms', '/privacy-policy'];
  return [
    ...pages.map(path => ({ url: absoluteUrl(path) })),
    ...articles.map(article => ({ url: absoluteUrl(`/news/${article.slug}`) })),
    ...games.map(game => ({ url: absoluteUrl(`/games/${game.slug}`) })),
  ];
}
