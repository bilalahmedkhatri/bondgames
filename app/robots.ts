import type { MetadataRoute } from 'next';
import { absoluteUrl, isPreview } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    // Dashboard remains crawlable so that its noindex directive can be read.
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ...(isPreview ? {} : { sitemap: absoluteUrl('/sitemap.xml') }),
  };
}
