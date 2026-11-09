import { JsonLd } from '@/components/JsonLd';
import { createBaseMetadata, type BaseMetadataData } from '@/lib/seo';

/**
 * Metadata-only server component. No visible UI or client-side effects.
 * In a route, also return createBaseMetadata(data).metadata from
 * generateMetadata so Next.js manages the head tags.
 * Render once per page; replace that page's existing JSON-LD when integrating.
 */
export function BaseMetadata({ data }: { data: BaseMetadataData }) {
  return <JsonLd data={createBaseMetadata(data).jsonLd} />;
}
