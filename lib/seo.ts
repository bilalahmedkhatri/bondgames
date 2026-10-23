import type { Metadata } from 'next';

export const SITE_NAME = 'GamerGrid';
export const SITE_URL = 'https://www.bondsgame.click';
export const SITE_DESCRIPTION = 'Gaming news, game reviews, PC system requirements, hardware comparisons and gaming deals for PC, PlayStation, Xbox and Nintendo players.';
export const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.SEO_NOINDEX === 'true';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, image = '/social-image', noIndex = false }: PageMetadataOptions): Metadata {
  const displayTitle = `${title} | ${SITE_NAME}`;
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: !noIndex && !isPreview, follow: true },
    openGraph: {
      type: 'website', locale: 'en_US', siteName: SITE_NAME,
      title: displayTitle, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: { card: 'summary_large_image', title: displayTitle, description, images: [absoluteUrl(image)] },
  };
}

// Only emit a date when the source contains a real day; never invent a modified date.
export function isoDate(value: string): string | undefined {
  if (!value || !(/\d{4}-\d{2}-\d{2}/.test(value) || /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(value))) return undefined;
  const date = new Date(/^[A-Z]/.test(value) ? `${value} UTC` : value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
