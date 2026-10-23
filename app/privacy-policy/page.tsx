import React from 'react';
import { pageMetadata } from '@/lib/seo';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = pageMetadata({ "title": "Privacy Policy", "description": "Learn how BondsGame handles personal information, cookies, community submissions and privacy requests.", "path": "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-4 border-b border-brand-border pb-6">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-brand-muted">
          Effective: October 2026 • BondsGame Privacy Office
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        <h2 className="font-heading text-xl font-bold text-white">Information We Collect</h2>
        <p>
          We collect minimal telemetry necessary to deliver fast, secure page loads, community voting integrity, and newsletter subscriptions. We do not sell your personal data or browsing behavior to third-party data brokers.
        </p>

        <h2 className="font-heading text-xl font-bold text-white">Cookies & Local Storage</h2>
        <p>
          We utilize essential local storage mechanisms to store your UI preferences (dark mode, search history) and prevent duplicate votes on interactive community polls.
        </p>
      </div>
    </div>
  );
}
