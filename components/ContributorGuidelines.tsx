import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTRIBUTOR_EMAIL, contributorFaqs, contributorSections } from '@/lib/contributor-guidelines';

export function ContributorGuidelines() {
  return (
    <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
      <aside className="lg:sticky lg:top-28 rounded-2xl border border-brand-border bg-brand-surface p-5 space-y-4">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">Contributor guide</p>
        <nav aria-label="Contributor guidelines" className="flex flex-wrap lg:flex-col gap-x-4 gap-y-3 text-sm text-brand-muted">
          {contributorSections.map(section => <a key={section.id} href={`#${section.id}`} className="hover:text-brand-cyan transition-colors">{section.title}</a>)}
          <a href="#sponsored-content" className="hover:text-brand-cyan transition-colors">Sponsored content</a>
          <a href="#contributor-faq" className="hover:text-brand-cyan transition-colors">Frequently asked questions</a>
          <a href="#contact-editorial" className="text-brand-red font-semibold hover:text-white transition-colors">Contact the editorial team</a>
        </nav>
      </aside>

      <div className="min-w-0 space-y-12">
        {contributorSections.map(section => (
          <section key={section.id} id={section.id} aria-label={section.title} className="scroll-mt-28 space-y-4">
            <SectionHeader title={section.title} />
            {section.paragraphs.map(paragraph => <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-brand-muted">{paragraph}</p>)}
            {section.items.length > 0 && (
              <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-brand-muted">
                {section.items.map(item => (
                  <li key={item.description} className="pl-4 border-l-2 border-brand-border">
                    {item.title && <strong className="text-white">{item.title}. </strong>}{item.description}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section id="sponsored-content" aria-label="Sponsored content" className="scroll-mt-28 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-7 space-y-4">
          <SectionHeader title="Sponsored content" accent="cyan" />
          <p className="text-sm sm:text-base leading-relaxed text-brand-muted">Companies can propose sponsorships for useful gaming or hardware content. A peripheral maker might support an accessibility guide, for example, or a development-tool company might sponsor a workflow tutorial. The topic still needs to help readers and meet our editorial standards.</p>
          <p className="text-sm sm:text-base leading-relaxed text-brand-muted">Sponsored posts are paid advertising placements. They must be clearly disclosed, and paid links must use the sponsored attribute. Payment does not buy a positive review, search rankings or guaranteed indexing.</p>
          <p className="text-sm sm:text-base leading-relaxed text-brand-muted"><Link href="/advertise" className="text-brand-cyan underline underline-offset-4">Discuss a sponsorship</Link> or read our <Link href="/editorial-guidelines" className="text-brand-cyan underline underline-offset-4">editorial and publishing policy</Link> before submitting.</p>
        </section>

        <section id="contributor-faq" aria-label="Frequently asked questions" className="scroll-mt-28">
          <SectionHeader title="Frequently asked questions" />
          <div className="divide-y divide-brand-border border-y border-brand-border">
            {contributorFaqs.map(faq => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer font-semibold text-white text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-brand-cyan focus-visible:outline-offset-4">{faq.question}</summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-brand-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact-editorial" aria-labelledby="editorial-contact-heading" className="border-l-4 border-brand-red pl-5 space-y-3 scroll-mt-28">
          <h2 id="editorial-contact-heading" className="font-heading text-2xl font-bold text-white">Contact the editorial team</h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">Tell us what you have learned and why it matters to other players or creators. Start with an outline, and include the experience that makes the idea yours.</p>
          {CONTRIBUTOR_EMAIL ? (
            <a href={`mailto:${CONTRIBUTOR_EMAIL}`} className="inline-flex max-w-full break-all text-brand-cyan font-semibold underline underline-offset-4">{CONTRIBUTOR_EMAIL}</a>
          ) : (
            <p className="text-sm text-brand-muted">Contact email will be added soon.</p>
          )}
          <p className="text-xs font-mono text-brand-muted">Last updated: <time dateTime="2026-09-23">23 September 2026</time></p>
        </section>
      </div>
    </div>
  );
}
