import Link from 'next/link';
import type { PartnerPageContent } from '@/lib/types';
import { partnerLinks } from '@/lib/partner-navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, CardBody } from '@/components/ui/Card';

interface PartnerInfoPageProps {
  content: PartnerPageContent;
  eyebrow?: string;
  relatedLinks?: readonly { label: string; href: string }[];
  relatedTitle?: string;
}

export function PartnerInfoPage({ content, eyebrow = 'BondsGame partners', relatedLinks = partnerLinks, relatedTitle = 'Related partner resources' }: PartnerInfoPageProps) {
  return (
    <div className="max-w-5xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ label: content.title }]} />

      <header className="max-w-3xl space-y-4 border-b border-brand-border pb-8">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan">{eyebrow}</p>
        <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">{content.title}</h1>
        <p className="text-sm sm:text-base leading-relaxed text-brand-muted">{content.introduction}</p>
      </header>

      <nav aria-label="On this page" className="flex flex-wrap gap-2">
        {content.sections.map(section => (
          <a key={section.id} href={`#${section.id}`} className="rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-xs sm:text-sm text-brand-muted hover:text-white hover:border-brand-cyan transition-colors">{section.title}</a>
        ))}
      </nav>

      <div className="max-w-3xl space-y-10">
        {content.sections.map(section => (
          <section key={section.id} id={section.id} aria-label={section.title} className="scroll-mt-28 space-y-4">
            <SectionHeader title={section.title} accent="cyan" />
            {section.paragraphs.map(paragraph => <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-brand-muted">{paragraph}</p>)}
            {section.items && (
              <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base leading-relaxed text-brand-muted marker:text-brand-cyan">
                {section.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <Card variant="highlight">
        <CardBody className="space-y-4 sm:p-7">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">{content.contact.title}</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-brand-muted">{content.contact.description}</p>
          <Link href={content.contact.href} className="inline-flex rounded-lg bg-brand-red hover:bg-brand-redDark px-4 py-3 text-sm font-bold text-white transition-colors">{content.contact.label}</Link>
        </CardBody>
      </Card>

      <nav aria-label={relatedTitle} className="border-t border-brand-border pt-6 space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{relatedTitle}</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-cyan">
          {relatedLinks.filter(link => link.href !== content.path).map(link => <li key={link.href}><Link href={link.href} className="hover:text-white underline underline-offset-4">{link.label}</Link></li>)}
        </ul>
      </nav>
    </div>
  );
}
