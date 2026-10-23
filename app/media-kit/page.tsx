import { PartnerInfoPage } from '@/components/PartnerInfoPage';
import { mediaKitPage } from '@/lib/partner-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(mediaKitPage);

export default function MediaKitPage() {
  return <PartnerInfoPage content={mediaKitPage} />;
}
