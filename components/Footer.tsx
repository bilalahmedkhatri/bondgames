'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2 } from 'lucide-react';
import { partnerLinks } from '@/lib/partner-navigation';
import { companyLinks } from '@/lib/company-navigation';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-black border-t border-brand-border mt-20 text-brand-muted text-xs">
      <div className="max-w-7xl mx-auto lg:px-0 md:px-4 sm:px-6 py-14 space-y-12">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="font-heading text-xl font-black tracking-tighter text-white">
                BONDS<span className="text-brand-red">GAME</span>
              </span>
            </Link>
            <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
              BondsGame is a high-performance independent gaming journalism and review portal dedicated to unbiased evaluations, hardware benchmark teardowns, and breaking video game news.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-400">
              Covering PC, PlayStation, Xbox & Nintendo gaming.
            </div>
          </div>

          {/* Editorial Hub */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase font-mono text-xs tracking-wider">Editorial</h4>
            <ul className="space-y-2 text-brand-muted">
              <li><Link href="/" className="hover:text-white transition-colors">Top Stories</Link></li>
              <li><Link href="/games" className="hover:text-white transition-colors">Game Catalogue</Link></li>
              <li><Link href="/games?sort=rating" className="hover:text-white transition-colors">Game Reviews</Link></li>
              <li><Link href="/hardware" className="hover:text-white transition-colors">Hardware Benchmarks</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Live News Wire</Link></li>
            </ul>
          </div>

          {/* Monetization & Contributors */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase font-mono text-xs tracking-wider">Partners</h4>
            <ul className="space-y-2 text-brand-muted">
              {partnerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className={link.href === '/submit-post' ? 'hover:text-yellow-400 transition-colors flex items-center gap-1.5 font-semibold text-amber-300' : 'hover:text-white transition-colors'}>
                    {link.href === '/submit-post' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase font-mono text-xs tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-brand-muted">
              {companyLinks.map(link => <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>)}
            </ul>
          </div>
        </div>

        {/* Dispatch Newsletter Subscription */}
        <div className="border-t border-brand-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-white font-bold text-sm uppercase font-mono tracking-wider">
              The Daily Dispatch
            </div>
            <p className="text-xs text-brand-muted">
              Get our daily 8:00 AM briefing of benchmark leaks, major reviews, and free PC game giveaways.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="bg-brand-surface border border-brand-border text-white text-xs px-4 py-2.5 rounded-lg focus:outline-none focus:border-brand-red w-full sm:w-72 font-mono"
            />
            <button
              type="submit"
              className="bg-brand-red hover:bg-brand-redDark text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Join
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <div>
            © 2026 BondsGame Media Network Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-brand-muted">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
            <span className="text-brand-red font-bold">Neon Postgres Connected</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
