'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle2, TrendingUp, Users, Monitor, Award } from 'lucide-react';

export default function AdvertisePage() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [budgetRange, setBudgetRange] = useState('$2,500 - $5,000');
  const [campaignObjective, setCampaignObjective] = useState('Brand Awareness');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const stats = [
    { label: 'Monthly Pageviews', value: 'Not verified', icon: Monitor },
    { label: 'Unique Readers', value: 'Not verified', icon: Users },
    { label: 'Avg Session Duration', value: 'Not verified', icon: TrendingUp },
    { label: 'Core Enthusiast Ratio', value: 'Not verified', icon: Award },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName || !contactName || !email) {
      return setError('Please provide company name, your name, and email.');
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ad_inquiry',
          data: {
            companyName,
            contactName,
            email,
            budgetRange,
            campaignObjective,
            message,
          },
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Submission error. Please try again.');
      }
    } catch {
      setError('Connection failure.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ label: 'Advertise With GamerGrid' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-3 py-1 rounded-full">
          Partner & Media Kit
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
          Showcase Your Brand to Gaming Enthusiasts
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          From sponsored GPU teardowns to high-visibility takeovers, connect directly with tech-forward hardware buyers and gamers.
        </p>
        <Link href="/media-kit" className="inline-flex text-sm font-semibold text-brand-cyan underline underline-offset-4 hover:text-white">View the media kit & audience information</Link>
      </div>

      {/* Media Kit Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center space-y-2 shadow-xl"
            >
              <Icon className="w-6 h-6 text-brand-cyan mx-auto mb-1" />
              <p className="font-heading text-lg sm:text-xl font-black text-white font-mono">
                {s.value}
              </p>
              <p className="text-xs font-mono uppercase text-brand-muted">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Inquiry Form Container */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-black text-white">
              Inquiry Dispatched!
            </h3>
            <p className="text-sm text-brand-muted max-w-md mx-auto">
              Our advertising partnerships director will review your campaign goals and provide our complete 2026 Media Kit and rate card to <span className="text-white font-mono">{email}</span> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-brand-border pb-4">
              <h2 className="font-heading text-xl font-black text-white">
                Request Rate Card & Media Kit
              </h2>
              <p className="text-xs text-brand-muted mt-1 font-mono">
                Direct partnership desk for gaming hardware, publishers, and peripherals.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Company / Studio Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Corsair, Razer, Capcom"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Estimated Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan font-mono"
                  >
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+ (Full Takeover)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Primary Objective
                  </label>
                  <select
                    value={campaignObjective}
                    onChange={(e) => setCampaignObjective(e.target.value)}
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan font-mono"
                  >
                    <option value="Game Launch / Pre-Orders">Game Launch / Pre-Orders</option>
                    <option value="Hardware Review & Teardown">Hardware Review & Teardown</option>
                    <option value="Brand Awareness Display">Brand Awareness Display</option>
                    <option value="Newsletter & Discord Sponsorship">Newsletter & Discord Sponsorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                  Campaign Scope & Timeline (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your target launch date or creative formats..."
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan resize-none"
                />
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
              className="w-full py-3.5 text-sm font-black uppercase tracking-wider bg-brand-cyan hover:bg-cyan-600 text-black rounded-xl shadow-lg shadow-brand-cyan/20"
              icon={<Send className="w-4 h-4" />}
            >
              Request Partnership Kit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
