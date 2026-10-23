import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Write for Us — Gaming Guest Post Guidelines',
  description: 'Write for BondsGame: read gaming guest post guidelines, explore article topics and contact the editorial team about contributions and sponsored content.',
  path: '/submit-post',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
