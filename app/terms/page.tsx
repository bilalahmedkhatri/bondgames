import React from 'react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = pageMetadata({ "title": "Terms of Service & Editorial Policy", "description": "Read BondsGame terms of service, editorial guidelines, advertising disclosures and affiliate policies.", "path": "/terms" });

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Service & Editorial Policy' }]} />

      <div className="space-y-4 border-b border-brand-border pb-6">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
          Terms of Service & Editorial Guidelines
        </h1>
        <p className="text-sm font-mono text-brand-muted">
          Last revised: October 2026 • BondsGame Media Network
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        <h2 className="font-heading text-xl font-bold text-white">1. Editorial Independence & Review Standards</h2>
        <p>
          At BondsGame, editorial scores (0 to 10) are determined entirely by independent reviewer evaluations. Review codes, hardware samples, and publisher briefings are accepted under the strict condition that editorial autonomy remains uncompromising. Publishers and advertisers hold no editorial oversight, advance copy review privileges, or scoring influence.
        </p>
        <p><Link href="/editorial-guidelines" className="text-brand-cyan underline underline-offset-4">Read the full editorial guidelines</Link> for sourcing, reviews, benchmark methodology and corrections.</p>

        <h2 className="font-heading text-xl font-bold text-white">2. Affiliate Disclosures & Transparency</h2>
        <p>
          Some product purchase links (e.g. Steam, PlayStation Store, Amazon, Best Buy) may generate an affiliate commission that supports our independent journalism. These links never influence review outcomes, benchmark conclusions, or product recommendations.
        </p>
        <p><Link href="/affiliate-policy" className="text-brand-cyan underline underline-offset-4">Read the affiliate policy</Link> for link disclosures, retailer purchases and commercial relationships.</p>

        <h2 className="font-heading text-xl font-bold text-white">3. Contributor & Sponsored Content Guidelines</h2>
        <p>
          All sponsored content, sponsored hardware tests, and paid guest posts are clearly marked with a dedicated disclaimer tag. Paid placement links must use rel=&quot;sponsored&quot;. Publication does not guarantee search indexing or rankings. All external claims regarding hardware performance must meet verifiable lab benchmark standards.
        </p>
      </div>
    </div>
  );
}
