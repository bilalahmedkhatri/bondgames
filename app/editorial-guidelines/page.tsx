import { PartnerInfoPage } from '@/components/PartnerInfoPage';
import { editorialGuidelinesPage } from '@/lib/partner-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(editorialGuidelinesPage);

export default function EditorialGuidelinesPage() {
  return <PartnerInfoPage content={editorialGuidelinesPage} />;
}
