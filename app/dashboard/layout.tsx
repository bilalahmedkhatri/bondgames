import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({"title":"Your Gaming Dashboard","description":"Manage your GamerGrid profile, saved games and community activity.","path":"/dashboard","noIndex":true});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
