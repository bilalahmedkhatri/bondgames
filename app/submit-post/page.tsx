'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Check, Send, Award, Zap, Building2, CheckCircle2 } from 'lucide-react';

export default function SubmitPostPage() {
  const [packageType, setPackageType] = useState<'Standard ($30)' | 'Featured Editorial ($50)' | 'Enterprise Partner (Custom)'>('Featured Editorial ($50)');
  const [title, setTitle] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe / Credit Card');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const tiers = [
    {
      name: 'Standard ($30)' as const,
      price: '$30',
      badge: 'Blogger',
      icon: Award,
      features: [
        '1 Dofollow Backlink included',
        'Standard editorial review (48h)',
        'Permanent post indexing',
        'Author byline box',
      ],
    },
    {
      name: 'Featured Editorial ($50)' as const,
      price: '$50',
      badge: 'Most Popular',
      icon: Zap,
      popular: true,
      features: [
        '2 Dofollow Backlinks included',
        'Fast-track 24h review & publish',
        'Homepage Top Stories placement for 48h',
        'Social blast to Discord & Twitter (140k+)',
        'Full author bio with social handles',
      ],
    },
    {
      name: 'Enterprise Partner (Custom)' as const,
      price: 'Custom',
      badge: 'Agencies',
      icon: Building2,
      features: [
        'Bulk publishing packages (5+ posts)',
        'Dedicated editorial account manager',
        'Custom interactive hardware charts',
        'Monthly invoice billing',
      ],
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !draftUrl || !authorName || !authorEmail) {
      return setError('Please fill in all required fields.');
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'guest_post',
          data: {
            title,
            draftUrl,
            authorName,
            authorEmail,
            authorBio,
            packageType,
            paymentMethod,
          },
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ label: 'Write for Us / Guest Post' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/30 px-3 py-1 rounded-full">
          Editorial Submission
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
          Write for GamerGrid & Reach Millions of Enthusiasts
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Publish your game reviews, hardware guides, and industry analyses on our premier high-authority gaming publication.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => {
          const isSelected = packageType === t.name;
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              onClick={() => setPackageType(t.name)}
              className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-surface border-brand-red shadow-xl shadow-brand-red/10 scale-102 ring-2 ring-brand-red'
                  : 'bg-brand-surface/60 border-brand-border hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-brand-muted">
                    {t.badge}
                  </span>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-brand-red' : 'text-slate-500'}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">{t.name}</h3>
                  <p className="text-3xl font-black text-white mt-2 font-mono">{t.price}</p>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-brand-border/60">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-brand-red text-white'
                      : 'bg-black/40 text-brand-muted border border-brand-border hover:text-white'
                  }`}
                >
                  {isSelected ? 'Selected Plan ✓' : 'Select Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Form Container */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-black text-white">
              Submission Received!
            </h3>
            <p className="text-sm text-brand-muted max-w-md mx-auto">
              Thank you! Our editorial review desk will inspect your draft against our quality guidelines. You will receive an email update at <span className="text-white font-mono">{authorEmail}</span> within 24-48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-brand-border pb-4">
              <h2 className="font-heading text-xl font-black text-white">
                Submit Your Article Pitch or Draft
              </h2>
              <p className="text-xs text-brand-muted mt-1 font-mono">
                Currently selected tier: <span className="text-brand-red font-bold">{packageType}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                  Proposed Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Deep Dive: Why Handheld PC APU Efficiency Redefines Mobile Gaming"
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                  Draft URL (Google Docs / Notion / Markdown) *
                </label>
                <input
                  type="url"
                  required
                  value={draftUrl}
                  onChange={(e) => setDraftUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red font-mono"
                />
                <p className="text-[11px] text-brand-muted mt-1 font-mono">
                  Make sure link sharing permission is set to "Anyone with link can view / comment".
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                    Author / Contributor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your Full Name or Pseudonym"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                    Email Address (For Review Updates) *
                  </label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                  Brief Author Bio & Socials (Optional)
                </label>
                <textarea
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="Tell our readers a little about your gaming background and expertise..."
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1.5 font-bold">
                  Preferred Payment Settlement
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red font-mono"
                >
                  <option value="Stripe / Credit Card">Stripe / Credit Card</option>
                  <option value="PayPal">PayPal Invoice</option>
                  <option value="Cryptocurrency (USDT/BTC)">Cryptocurrency (USDT/BTC)</option>
                  <option value="Direct Wire / SEPA">Direct Bank Wire / SEPA</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={submitting}
              className="w-full py-4 text-sm font-black uppercase tracking-wider bg-brand-red hover:bg-brand-redDark text-white rounded-xl shadow-lg shadow-brand-red/20"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Article for Editorial Review
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
