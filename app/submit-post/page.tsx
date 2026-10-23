import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContributorGuidelines } from '@/components/ContributorGuidelines';

export default function SubmitPostPage() {
  return (
    <div className="max-w-6xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ label: 'Write for Us / Guest Post' }]} />

      <header className="max-w-3xl mx-auto text-center space-y-5">
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">Write for BondsGame</h1>
        <p className="text-sm sm:text-base leading-relaxed text-brand-muted">Share what you have learned. We welcome practical, experience-based articles for people who play, build and care about games—from your first outline to the final edit.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#contact-editorial" className="rounded-xl bg-brand-red hover:bg-brand-redDark text-white px-5 py-3 text-sm font-bold transition-colors">Contact the editorial team</a>
          <a href="#what-we-publish" className="rounded-xl border border-brand-border hover:border-brand-cyan text-white px-5 py-3 text-sm font-semibold transition-colors">Read the guidelines</a>
        </div>
      </header>

      <ContributorGuidelines />
    </div>
  );
}
