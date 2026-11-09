import type { MetadataRoute } from 'next';
import { publishedIndex } from '@/lib/blog/queries';
import { blogUrl } from '@/lib/blog/config';
import { getGames } from '@/lib/db/games';
import { absoluteUrl, isPreview } from '@/lib/seo';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isPreview) return [];
  const [articles, games] = await Promise.all([publishedIndex(), getGames()]);
  const pages = ['/', '/news', '/games', '/hardware', '/deals', '/community', '/submit-post', '/advertise', '/media-kit', '/editorial-guidelines', '/affiliate-policy', '/contact', '/press', '/terms', '/privacy-policy'];
  return [
    ...pages.map(path => ({ url: absoluteUrl(path) })),
    ...articles.map(article => ({ url: blogUrl(article.locale, article.slug), lastModified: new Date(article.updated_at) })),
    ...games.map(game => ({ url: absoluteUrl(`/games/${game.slug}`) })),
  ];
}
