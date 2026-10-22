import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { ClientShell } from '@/components/ClientShell';

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
  title: {
    default: 'GamerGrid | High-End Gaming News, Reviews & Benchmarks',
    template: '%s | GamerGrid',
  },
  description:
    'The premier destination for gaming news, unbiased game reviews, hardware benchmarks, and gaming deals. Powered by Neon Postgres.',
  keywords: ['gaming news', 'game reviews', 'hardware benchmarks', 'PC gaming', 'PS5', 'Xbox'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamergrid.io',
    siteName: 'GamerGrid',
    title: 'GamerGrid | High-End Gaming News, Reviews & Benchmarks',
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
