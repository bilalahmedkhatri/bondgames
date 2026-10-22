/**
 * NewsletterBanner.tsx
 * Full-width inline email subscription banner.
 */
'use client';
import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NewsletterBannerProps {
  variant?: 'section' | 'compact';
  className?: string;
}

export function NewsletterBanner({ variant = 'section', className = '' }: NewsletterBannerProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {submitted ? (
          <span className="text-sm text-brand-cyan flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Subscribed!
          </span>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
            />
            <Button type="submit" loading={loading} size="sm">Subscribe</Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple/20 via-slate-900 to-brand-red/20 border border-slate-700 p-10 text-center ${className}`}>
      {/* Background orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <Mail className="w-10 h-10 text-brand-cyan mx-auto mb-4" />
        <h3 className="font-heading text-3xl font-extrabold text-white mb-2">Level Up Your Inbox</h3>
        <p className="text-muted-text mb-6 max-w-md mx-auto">
          Weekly gaming highlights, exclusive reviews, and hardware deals — delivered every Friday.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-brand-cyan text-lg font-semibold">
            <CheckCircle className="w-6 h-6" /> You&apos;re subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-cyan text-sm"
            />
            <Button type="submit" loading={loading} size="lg">
              Subscribe Free
            </Button>
          </form>
        )}
        <p className="text-xs text-slate-600 mt-4">No spam. Unsubscribe any time.</p>
      </div>
    </div>
  );
}
