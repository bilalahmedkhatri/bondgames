import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, pageMetadata, SITE_NAME } from '@/lib/seo';

import Link from 'next/link';
import { getArticles } from '@/lib/db/articles';
import { getGames } from '@/lib/db/games';
import { getPoll } from '@/lib/db/poll';
import { INITIAL_BENCHMARKS, INITIAL_HARDWARE_COMPARISON } from '@/lib/db/seed-data';

import { HeroLeadArticle } from '@/components/HeroLeadArticle';
import { TrendingGamesRail } from '@/components/TrendingGamesRail';
import { ArticleCard } from '@/components/ArticleCard';
import { GameCard } from '@/components/GameCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { BenchmarkChart } from '@/components/BenchmarkChart';
import { CommunityPoll } from '@/components/CommunityPoll';
import { NewsletterBanner } from '@/components/NewsletterBanner';
import { Sidebar } from '@/components/Sidebar';

import {
  Flame,
  Zap,
  Cpu,
  Trophy,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Gamepad2,
} from 'lucide-react';

export const metadata = pageMetadata({ "title": "Gaming News, Game Reviews & Hardware", "description": "Gaming news, game reviews, PC system requirements, hardware comparisons and gaming deals for PC, PlayStation, Xbox and Nintendo players.", "path": "/" });

export default async function HomePage() {
  const [articles, games, poll] = await Promise.all([
    getArticles(),
    getGames(),
    getPoll(),
  ]);

  const leadArticle = articles.find((a) => a.isLead) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 4);
  const reviewArticles = articles.filter((a) => a.category === 'Review');
  const hardwareArticles = articles.filter((a) => a.category === 'Hardware');
  const latestArticles = articles.slice(0, 6);
  const featuredGames = games.filter((g) => g.isFeatured || g.score >= 9.2).slice(0, 4);

  // Formatted benchmark items for the chart
  const benchmarkResults = INITIAL_BENCHMARKS.map((b) => ({
    hardware: `${b.title} (${b.gpuNote})`,
    score: b.fps4k,
    unit: 'FPS @ 4K Ultra',
  }));

  return (
    <div className="max-w-7xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-12">
      <h1 className="sr-only">Gaming News, Game Reviews & Hardware Comparisons</h1>
      <JsonLd data={{
        '@context': 'https://schema.org', '@graph': [
          { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: SITE_NAME, url: absoluteUrl('/'), inLanguage: 'en', publisher: { '@id': absoluteUrl('/#organization') } },
          { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: SITE_NAME, url: absoluteUrl('/') },
        ]
      }} />
      {/* ── SECTION 1: ASYMMETRICAL HERO WITH BREAKING FEED ─────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Lead Story */}
        <div className="lg:col-span-8 flex flex-col">
          {leadArticle && <HeroLeadArticle article={leadArticle} />}
        </div>

        {/* Live News Feed Sidebar */}
        <div className="lg:col-span-4 bg-brand-surface border border-brand-border rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="border-b border-brand-border pb-3 mb-3 flex items-center justify-between">
            <h2 className="font-heading text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
              Live Breaking Feed
            </h2>
            <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/30">
              Real-time
            </span>
          </div>

          <div className="divide-y divide-brand-border/60 flex-1 flex flex-col justify-between">
            {sideArticles.map((article) => (
              <article key={article.id} className="py-3 group">
                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted mb-1">
                  <CategoryBadge label={article.category} size="xs" />
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-amber" />
                    {article.readTime}m read
                  </span>
                </div>
                <Link href={`/news/${article.slug}`}>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>

          <div className="pt-3 mt-2 border-t border-brand-border">
            <Link
              href="/news"
              className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-brand-muted hover:text-white transition-colors"
            >
              <span>View All Breaking News</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRENDING TITLES RAIL ──────────────────────────── */}
      <TrendingGamesRail games={games} />

      {/* ── SECTION 3: EDITORIAL SPOTLIGHT & REVIEWS ─────────────────── */}
      <section className="space-y-6">
        <SectionHeader
          title="Editors' Choice & Critical Acclaim"
          subtitle="The highest-rated games of this generation, meticulously tested and scored."
          href="/games"
          viewAllLabel="Explore All Games"
          accent="purple"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} variant="default" />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: HARDWARE LAB & REAL-TIME BENCHMARKS ───────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Benchmark Teardown */}
        <div className="lg:col-span-7 space-y-4">
          <SectionHeader
            title="Hardware Lab Benchmarks"
            subtitle="Real-world frame rates measured across next-gen GPUs and consoles."
            href="/hardware"
            viewAllLabel="Full GPU Benchmarks"
            accent="cyan"
          />

          <BenchmarkChart
            title="4K Ultra Path Tracing & Cinematic Rasterization (Average FPS)"
            results={benchmarkResults}
            unit="FPS"
          />

          {/* Quick specs badge preview */}
          <div className="p-4 rounded-xl border border-brand-border bg-brand-surface/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-cyan" />
              <span className="text-white font-semibold">Test Rig Standard:</span>
              <span className="text-brand-muted">Intel Core i9-14900K / 64GB DDR5 / PCIe 5.0 NVMe</span>
            </div>
            <Link
              href="/hardware"
              className="text-brand-cyan hover:underline font-bold"
            >
              Methodology →
            </Link>
          </div>
        </div>

        {/* Right: Flagship Hardware Comparison Preview */}
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-red flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Flagship Showdown
              </span>
              <h3 className="font-heading text-lg font-black text-white mt-1">
                {INITIAL_HARDWARE_COMPARISON.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-black/40 border border-brand-border space-y-1">
              <span className="text-[10px] uppercase font-mono text-brand-red font-bold">
                {INITIAL_HARDWARE_COMPARISON.deviceA.tag}
              </span>
              <p className="font-heading font-black text-white text-base">
                {INITIAL_HARDWARE_COMPARISON.deviceA.name}
              </p>
              <p className="text-xs font-mono text-emerald-400 font-bold">
                {INITIAL_HARDWARE_COMPARISON.deviceA.highlightScore}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-brand-border space-y-1">
              <span className="text-[10px] uppercase font-mono text-brand-cyan font-bold">
                {INITIAL_HARDWARE_COMPARISON.deviceB.tag}
              </span>
              <p className="font-heading font-black text-white text-base">
                {INITIAL_HARDWARE_COMPARISON.deviceB.name}
              </p>
              <p className="text-xs font-mono text-brand-muted">
                {INITIAL_HARDWARE_COMPARISON.deviceB.highlightScore}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="space-y-2 text-xs font-mono">
            {INITIAL_HARDWARE_COMPARISON.metrics.slice(0, 4).map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded bg-black/20 border border-brand-border/40"
              >
                <span className="text-brand-muted">{m.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${m.winner === 'A' ? 'text-brand-red' : 'text-slate-300'}`}>
                    {m.valA}
                  </span>
                  <span className="text-brand-border">vs</span>
                  <span className={`font-bold ${m.winner === 'B' ? 'text-brand-cyan' : 'text-brand-muted'}`}>
                    {m.valB}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/hardware"
            className="block text-center w-full py-2.5 rounded-xl bg-brand-surfaceHover border border-brand-border text-xs font-mono font-bold uppercase tracking-wider text-white hover:border-brand-cyan hover:text-brand-cyan transition-colors"
          >
            Open Side-by-Side Spec Analyzer →
          </Link>
        </div>
      </section>

      {/* ── SECTION 5: LATEST ARTICLES & COMMUNITY SIDEBAR ───────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Latest Articles Grid */}
        <div className="lg:col-span-8 space-y-6">
          <SectionHeader
            title="In-Depth Features & Investigative Journalism"
            subtitle="Unbiased gaming critiques, developer post-mortems, and market analysis."
            href="/news"
            viewAllLabel="All Articles"
            accent="red"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="feature" />
            ))}
          </div>
        </div>

        {/* Right: Sidebar with Community Poll and Trending */}
        <div className="lg:col-span-4 space-y-8">
          {poll && (
            <CommunityPoll
              pollId={poll.id || 'goty-poll'}
              question={poll.question}
              options={poll.options}
              totalVotes={poll.totalVotes}
            />
          )}

          <Sidebar
            trendingGames={games.slice(0, 4)}
            recentArticles={articles.slice(2, 6)}
          />
        </div>
      </section>

      {/* ── SECTION 6: VIP NEWSLETTER CALLOUT ───────────────────────── */}
      <NewsletterBanner />
    </div>
  );
}
