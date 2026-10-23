import { PartnerInfoPage } from '@/components/PartnerInfoPage';
import { pressPage } from '@/lib/company-pages';
import { companyLinks } from '@/lib/company-navigation';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(pressPage);

export default function PressPage() {
  return <PartnerInfoPage content={pressPage} eyebrow="BondsGame press desk" relatedLinks={companyLinks} relatedTitle="Company & Legal" />;
}
