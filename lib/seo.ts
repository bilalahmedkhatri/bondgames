import type { Metadata } from 'next';

export const SITE_NAME = 'BondsGame';
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

export interface BaseMetadataData {
  title: string;
  description: string;
  path: string;
  /** null omits the canonical, for example on filtered search pages. */
  canonicalPath?: string | null;
  image?: string;
  imageAlt?: string;
  /** BCP 47 language, such as en-US or ur-PK. */
  language?: string;
  /** Only include translations that actually exist. */
  translations?: Record<string, string>;
  noIndex?: boolean;
  authors?: Array<{ name: string; url?: string }>;
  article?: {
    type?: 'Article' | 'NewsArticle' | 'BlogPosting';
    publishedAt?: string;
    modifiedAt?: string;
    section?: string;
  };
  /** Real entities discussed on the page; do not add ranking claims. */
  about?: Array<{ name: string; url?: string }>;
}

/**
 * Build both outputs from the same route/database data on the server.
 * Return .metadata from generateMetadata; pass the data to BaseMetadata in
 * the page for JSON-LD. This function does not fetch or mutate content.
 */
export function createBaseMetadata(data: BaseMetadataData): {
  metadata: Metadata;
  jsonLd: Record<string, unknown>;
} {
  const {
    title, description, path, image = '/social-image', imageAlt = title,
    language = 'en-US', article, authors,
  } = data;
  const canonical = data.canonicalPath === null
    ? undefined
    : absoluteUrl(data.canonicalPath ?? path);
  const url = canonical ?? absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const publishedTime = article?.publishedAt ? isoDate(article.publishedAt) : undefined;
  const modifiedTime = article?.modifiedAt ? isoDate(article.modifiedAt) : undefined;
  const authorMetadata = authors?.map(({ name, url }) => ({
    name, ...(url ? { url: absoluteUrl(url) } : {}),
  }));
  const metadata = pageMetadata({ title, description, path, image, noIndex: data.noIndex });
  metadata.alternates = {
    ...(canonical ? { canonical } : {}),
    ...(data.translations ? {
      languages: Object.fromEntries(Object.entries(data.translations).map(
        ([locale, translationPath]) => [locale, absoluteUrl(translationPath)],
      )),
    } : {}),
  };
  metadata.authors = authorMetadata;
  metadata.openGraph = {
    type: article ? 'article' : 'website',
    locale: language.replace(/-/g, '_'), siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`, description, url,
    images: [{ url: imageUrl, alt: imageAlt }],
    ...(article ? {
      publishedTime, modifiedTime, section: article.section,
      authors: authorMetadata?.flatMap((author) => author.url ? [author.url] : []),
    } : {}),
  };
  metadata.twitter = {
    card: 'summary_large_image', title: `${title} | ${SITE_NAME}`, description,
    images: [{ url: imageUrl, alt: imageAlt }],
  };

  const pageId = `${url}#webpage`;
  const websiteId = `${SITE_URL}/#website`;
  const publisherId = `${SITE_URL}/#organization`;
  const about = data.about?.map(({ name, url }) => ({
    '@type': 'Thing', name, ...(url ? { sameAs: absoluteUrl(url) } : {}),
  }));
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': publisherId, name: SITE_NAME, url: SITE_URL },
      {
        '@type': 'WebSite', '@id': websiteId, name: SITE_NAME, url: SITE_URL,
        publisher: { '@id': publisherId },
      },
      {
        '@type': 'WebPage', '@id': pageId, url, name: title, description,
        inLanguage: language, isPartOf: { '@id': websiteId },
        ...(about?.length ? { about } : {}),
      },
      ...(article ? [{
        '@type': article.type ?? 'Article', '@id': `${url}#article`,
        headline: title, description, image: imageUrl, inLanguage: language,
        mainEntityOfPage: { '@id': pageId }, publisher: { '@id': publisherId },
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
        ...(article.section ? { articleSection: article.section } : {}),
        ...(authorMetadata?.length ? {
          author: authorMetadata.map((author) => ({ '@type': 'Person', ...author })),
        } : {}),
        ...(about?.length ? { about } : {}),
      }] : []),
    ],
  };
  return { metadata, jsonLd };
}
