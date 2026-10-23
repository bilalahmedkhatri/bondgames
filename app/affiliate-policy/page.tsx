import { PartnerInfoPage } from '@/components/PartnerInfoPage';
import { affiliatePolicyPage } from '@/lib/partner-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(affiliatePolicyPage);

export default function AffiliatePolicyPage() {
  return <PartnerInfoPage content={affiliatePolicyPage} />;
}
