import Image from 'next/image';
import { safeLink } from '@/lib/blog/urls';

interface ArticleCoverProps {
  src: string;
  alt: string;
  caption?: string | null;
  attribution?: unknown;
}

export function ArticleCover({ src, alt, caption, attribution }: ArticleCoverProps) {
  const credit = attribution && typeof attribution === 'object' && !Array.isArray(attribution)
    ? attribution as Record<string, unknown> : {};
  const source = safeLink(credit.source_url);
  const license = safeLink(credit.license_url);
  const fallbackCredit = typeof credit.credit === 'string' ? credit.credit : '';

  return (
    <figure className="space-y-3">
      <div className="relative aspect-[16/9] w-full max-h-[520px] rounded-2xl overflow-hidden border border-brand-border shadow-2xl bg-black">
        <Image src={src} alt={alt} fill preload className="object-cover" sizes="(min-width: 1280px) 840px, (min-width: 1024px) 66vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      {(caption || fallbackCredit || source || license) && (
        <figcaption className="text-xs leading-relaxed text-brand-muted">
          {caption || fallbackCredit}
          {source && <> <a href={source} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-cyan underline">Image source</a>.</>}
          {license && <> <a href={license} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-cyan underline">License</a>.</>}
        </figcaption>
      )}
    </figure>
  );
}
