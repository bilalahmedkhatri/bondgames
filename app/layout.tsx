import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { ClientShell } from '@/components/ClientShell';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, isPreview } from '@/lib/seo';
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BondsGame | High-End Gaming News, Reviews & Benchmarks',
    template: '%s | BondsGame',
  },
  description:
    SITE_DESCRIPTION,
  robots: { index: !isPreview, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.webp', type: 'image/webp', sizes: '192x192' },
      { rel: 'icon', url: '/icon-512.webp', type: 'image/webp', sizes: '512x512' },
    ],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: {
      'ahrefs-site-verification': 'f1edd95ff6fb57cb63b960961e42ff5ddabe7b6b6de0e09e4e98d6e77181ddb6',
    },
  },
  keywords: ['gaming news', 'game reviews', 'hardware benchmarks', 'PC gaming', 'PS5', 'Xbox'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: 'BondsGame | High-End Gaming News, Reviews & Benchmarks',
    description: 'Premier gaming journalism, hardware teardowns, and review scores.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BondsGame.click — Next-Gen Gaming Journalism & Benchmarks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BondsGame | High-End Gaming News, Reviews & Benchmarks',
    description: 'Premier gaming journalism, hardware teardowns, and review scores.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} dark`}>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white">
        <ClientShell>{children}</ClientShell>
        <Analytics />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="T/IEWTepaT5QIg/piSKcLg"
          async
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
