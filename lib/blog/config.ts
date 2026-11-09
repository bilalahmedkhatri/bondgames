import { SITE_URL } from '@/lib/seo';

// Only this adapter changes between applications. BondsGame uses /news, English.
export const blogConfig = {
  origin: SITE_URL,
  locales: ['en'] as readonly string[],
  routeBase: '/news',
  pageSize: 12,
  maxPageSize: 48,
  maxPage: 10000,
};
export const blogPath = (locale: string, slug?: string) => {
  if (!blogConfig.locales.includes(locale)) throw new Error('Unsupported blog locale.');
  return blogConfig.routeBase + (slug ? `/${encodeURIComponent(slug)}` : '');
};
export const blogUrl = (locale: string, slug?: string) => new URL(blogPath(locale, slug), blogConfig.origin).href;
export function mediaOrigins(): string[] {
  return (process.env.BLOG_MEDIA_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean).map(value => {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Invalid blog media configuration.');
    return url.origin;
  });
}
