import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArticleCard } from '@/components/ArticleCard';
import { GameCard } from '@/components/GameCard';
import { BenchmarkChart } from '@/components/BenchmarkChart';
import { getCreators, getCreatorBySlug } from '@/lib/db/creators';
import { getArticles } from '@/lib/db/articles';
import { getGames } from '@/lib/db/games';
import { 
  ShieldCheck, 
  Cpu, 
  Tv, 
  Gamepad2, 
  Headphones, 
  Award, 
  BookOpen, 
  Eye, 
  Star, 
  Calendar, 
  ExternalLink, 
  Mail, 
  Sparkles,
  Layers,
  MapPin,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Creators & Staff Profile | BondsGame',
  description: 'Meet BondsGame lead gaming journalists, hardware benchmark architects, and certified review critics.',
};

interface CreatorsPageProps {
  searchParams?: Promise<{ creator?: string }>;
}

export default async function CreatorsPage({ searchParams }: CreatorsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentSlug = resolvedParams.creator || 'alex-mercer';

  const creators = await getCreators();
  const creator = await getCreatorBySlug(currentSlug) || creators[0];

  const allArticles = await getArticles();
  const allGames = await getGames();

  // Articles published by or relevant to this creator
  const creatorArticles = allArticles.filter(a => 
    a.author.toLowerCase().includes(creator.name.toLowerCase()) ||
    (creator.featuredArticleSlugs && creator.featuredArticleSlugs.includes(a.slug))
  ).slice(0, 4);

  // Fallback to top articles if needed
  const displayArticles = creatorArticles.length > 0 ? creatorArticles : allArticles.slice(0, 4);

  // Games scored by this creator
  const creatorGames = allGames.filter(g => 
    creator.featuredGameSlugs && creator.featuredGameSlugs.includes(g.slug)
  );
  const displayGames = creatorGames.length > 0 ? creatorGames : allGames.slice(0, 3);

  // Demo hardware benchmark test conducted by this creator
  const gpuBenchmarkResults = [
    { hardware: 'GeForce RTX 5090 (Leaked Blackwell Lab)', score: 142, resolution: '4K Ultra' },
    { hardware: 'GeForce RTX 4090 OC (Alex Mercer Test Rig)', score: 104, resolution: '4K Ultra' },
    { hardware: 'Radeon RX 7900 XTX (Marcus Thorne Rig)', score: 82, resolution: '4K Ultra' },
    { hardware: 'PlayStation 5 Pro (PSSR Quality Mode)', score: 60, resolution: 'Dynamic 4K' },
    { hardware: 'PlayStation 5 Base (Standard Mode)', score: 38, resolution: '1440p' },
  ];

  return (
    <div className="max-w-7xl mx-auto lg:px-0 md:px-4 px-3 py-6 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Editorial Team', href: '/creators' },
          { label: creator.name }
        ]} 
      />

      {/* ═══════════════════════════════════════════════════════
          HERO CREATOR PROFILE CARD
          ═══════════════════════════════════════════════════════ */}
      <section className="relative rounded-3xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl">
        {/* Ambient Top Backdrop Gradient */}
        <div className="absolute inset-0 h-48 bg-gradient-to-r from-brand-red/20 via-brand-purple/20 to-brand-cyan/20 blur-2xl pointer-events-none" />
        <div className="h-32 sm:h-44 w-full relative bg-gradient-to-r from-slate-900 via-brand-surface to-slate-900 border-b border-brand-border/60">
          <div className="absolute inset-0 bg-[radial-gradient(#e63946_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        </div>

        {/* Content Body */}
        <div className="px-5 sm:px-10 pb-8 pt-0 relative z-10 -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            
            {/* Creator Avatar with Verified Halo */}
            <div className="relative shrink-0">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-brand-red bg-brand-bg shadow-2xl ring-4 ring-black/40">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, 144px"
                  priority
                />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-brand-red text-white p-1.5 rounded-full shadow-lg border-2 border-brand-bg" title="Official Verified Editorial Staff">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            {/* Identity & Bio */}
            <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight break-words">
                  {creator.name}
                </h1>
                <span className="font-mono text-xs sm:text-sm text-brand-cyan font-bold">
                  {creator.handle}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase bg-brand-red/15 text-brand-red border border-brand-red/40">
                  <Award className="w-3 h-3" /> Official Editorial Staff
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-brand-muted font-mono">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  {creator.role}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {creator.location}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {creator.bio}
              </p>

              {/* Specialties Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
                {creator.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-md bg-black/40 border border-brand-border text-[11px] font-mono text-slate-300"
                  >
                    #{spec}
                  </span>
                ))}
              </div>

              {/* Social Channels Row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {creator.socials.youtube && (
                  <a
                    href={creator.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-xs font-mono text-red-300 transition-colors"
                  >
                    <span>YouTube Lab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {creator.socials.twitter && (
                  <a
                    href={creator.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-xs font-mono text-sky-300 transition-colors"
                  >
                    <span>Twitter / X</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {creator.socials.discord && (
                  <a
                    href={creator.socials.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-xs font-mono text-indigo-300 transition-colors"
                  >
                    <span>Discord Server</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {creator.socials.email && (
                  <a
                    href={`mailto:${creator.socials.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover border border-brand-border text-xs font-mono text-slate-300 transition-colors"
                  >
                    <Mail className="w-3 h-3 text-brand-red" />
                    <span>Pitch Story</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              CREATOR METRICS STATS BAR
              ═══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-brand-border/60">
            <div className="bg-brand-bg/60 border border-brand-border/60 rounded-xl p-3.5 text-center">
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                {creator.stats.articlesPublished}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-brand-muted tracking-wider mt-0.5">
                Dispatches Published
              </div>
            </div>

            <div className="bg-brand-bg/60 border border-brand-border/60 rounded-xl p-3.5 text-center">
              <div className="text-xl sm:text-2xl font-heading font-black text-brand-red">
                {creator.stats.gamesScored}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-brand-muted tracking-wider mt-0.5">
                Games Scored
              </div>
            </div>

            <div className="bg-brand-bg/60 border border-brand-border/60 rounded-xl p-3.5 text-center">
              <div className="text-xl sm:text-2xl font-heading font-black text-brand-cyan">
                {creator.stats.monthlyReaders}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-brand-muted tracking-wider mt-0.5">
                Monthly Readers
              </div>
            </div>

            <div className="bg-brand-bg/60 border border-brand-border/60 rounded-xl p-3.5 text-center">
              <div className="text-xl sm:text-2xl font-heading font-black text-brand-purple">
                {creator.stats.averageScore} / 10
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-brand-muted tracking-wider mt-0.5">
                Average Rating
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-brand-bg/60 border border-brand-border/60 rounded-xl p-3.5 text-center">
              <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400">
                {creator.stats.yearsActive}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-brand-muted tracking-wider mt-0.5">
                Editorial Tenure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TEST BENCH & HARDWARE SETUP
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-brand-cyan" />
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
              Creator Benchmark Rig & Hardware Setup
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-muted">
            Official Testing Bench calibrated for 2026/2027 Games
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 border border-brand-border/60 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-mono font-bold text-brand-cyan uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Primary PC Benchmark Test Rig
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
              {creator.hardware.pcBench}
            </p>
          </div>

          <div className="bg-black/30 border border-brand-border/60 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-mono font-bold text-brand-purple uppercase flex items-center gap-1.5">
              <Tv className="w-4 h-4" /> Reference Color & HDR Displays
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
              {creator.hardware.display}
            </p>
          </div>

          <div className="bg-black/30 border border-brand-border/60 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-mono font-bold text-brand-red uppercase flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4" /> Console Analysis Stations
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
              {creator.hardware.consoles}
            </p>
          </div>

          {creator.hardware.peripherals && (
            <div className="bg-black/30 border border-brand-border/60 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <Headphones className="w-4 h-4" /> Studio Acoustics & Input Devices
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                {creator.hardware.peripherals}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: PUBLISHED ARTICLES BY THIS CREATOR
          ═══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionHeader
          title={`Dispatches & Reviews by ${creator.name}`}
          subtitle="Investigative journalism, platform teardowns, and verified industry analysis."
          href="/news"
          viewAllLabel="All Articles"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="feature" />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: GAMES SCORED & REVIEWED
          ═══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionHeader
          title={`Games Scored & Tested by ${creator.name}`}
          subtitle="Editorial scores with verified pros/cons breakdown and performance evaluations."
          href="/games"
          viewAllLabel="All Games"
          accent="purple"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGames.map((game) => (
            <GameCard key={game.id} game={game} variant="default" />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: REAL-WORLD BENCHMARKS CONDUCTED
          ═══════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionHeader
          title="Hardware Lab FPS Benchmarks"
          subtitle="Real-world in-game 4K Ultra and ray-tracing performance measured in our lab."
          href="/hardware"
          viewAllLabel="Hardware Hub"
          accent="cyan"
        />

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Unreal Engine 5.5 + Hardware Path Tracing Benchmark
              </h3>
              <p className="text-xs text-brand-muted font-mono mt-0.5">
                Resolution: 3840x2160 (4K Native / PSSR Quality) • Tested by {creator.name}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 self-start sm:self-auto">
              FPS Benchmark Lab
            </span>
          </div>

          <BenchmarkChart
            results={gpuBenchmarkResults}
            title="Black Myth: Wukong / Cyberpunk 2077 Path Tracing Average FPS"
            unit="FPS"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: EDITORIAL TEAM ROSTER (MEET OTHER CREATORS)
          ═══════════════════════════════════════════════════════ */}
      <section className="space-y-6 pt-6 border-t border-brand-border">
        <SectionHeader
          title="BondsGame Editorial Staff & Creators"
          subtitle="Select any content creator or editor to view their published works, hardware benches, and game scores."
          accent="red"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {creators.map((c) => {
            const isSelected = c.slug === creator.slug;
            return (
              <Link
                key={c.id}
                href={`/creators?creator=${c.slug}`}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-brand-surface border-brand-red shadow-xl ring-2 ring-brand-red/30'
                    : 'bg-brand-surface/60 hover:bg-brand-surface border-brand-border hover:border-slate-600'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-brand-border group-hover:border-brand-red transition-colors shrink-0">
                      <Image
                        src={c.avatar}
                        alt={c.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-bold text-white text-sm group-hover:text-brand-red transition-colors truncate">
                        {c.name}
                      </div>
                      <div className="text-[11px] font-mono text-brand-cyan truncate">
                        {c.handle}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-brand-muted line-clamp-2">
                    {c.role}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-border/40 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    {c.stats.articlesPublished} Dispatches
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-brand-red' : 'text-slate-300 group-hover:text-white'}`}>
                    {isSelected ? 'Viewing Profile' : 'View Profile →'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
