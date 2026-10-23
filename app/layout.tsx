import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { ClientShell } from '@/components/ClientShell';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, isPreview } from '@/lib/seo';

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
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, yandex: process.env.YANDEX_SITE_VERIFICATION },
  keywords: ['gaming news', 'game reviews', 'hardware benchmarks', 'PC gaming', 'PS5', 'Xbox'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: 'BondsGame | High-End Gaming News, Reviews & Benchmarks',
    description: 'Premier gaming journalism, hardware teardowns, and review scores.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} dark`}>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
