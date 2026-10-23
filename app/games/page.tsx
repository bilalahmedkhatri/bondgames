import React from 'react';
import { pageMetadata } from '@/lib/seo';

import Link from 'next/link';
import { getGames } from '@/lib/db/games';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GameCard } from '@/components/GameCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FilterBar } from '@/components/FilterBar';
import { Flame, SlidersHorizontal, Gamepad2 } from 'lucide-react';

export async function generateMetadata({ searchParams }: GamesPageProps) {
  const params = await searchParams;
  const filtered = Boolean(params.q?.trim() || [params.genre, params.platform, params.status].some(value => value && value.toLowerCase() !== 'all'));
  const metadata = pageMetadata({"title":"Game Reviews, Platforms & PC Requirements","description":"Explore game details, editorial scores, supported platforms and PC system requirements in the GamerGrid catalogue.","path":"/games", noIndex: filtered });
  if (filtered) delete metadata.alternates;
  return metadata;
}

interface GamesPageProps {
  searchParams: Promise<{
    genre?: string;
    platform?: string;
    status?: string;
    sort?: string;
    q?: string;
  }>;
}

export default async function GameCataloguePage({ searchParams }: GamesPageProps) {
  const params = await searchParams;
  const genre = params.genre || 'all';
  const platform = params.platform || 'all';
  const status = params.status || 'all';
  const sort = params.sort || 'popular';
  const query = params.q || '';

  const games = await getGames({
    genre: genre !== 'all' ? genre : undefined,
    platform: platform !== 'all' ? platform : undefined,
    status: status !== 'all' ? status : undefined,
    sort,
    query: query.trim() || undefined,
  });

  const genres = ['all', 'Action', 'RPG', 'Souls-like', 'Platformer', 'Shooter', 'Horror', 'Adventure'];
  const platforms = ['all', 'PC', 'PS5', 'Xbox Series X'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Game Catalogue & Reviews' }]} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-purple flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5" /> Database & Review Vault
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Game Catalogue & Editorial Scores
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl">
            Unbiased critical reviews, comprehensive system requirements, and hardware performance breakdowns.
          </p>
        </div>

        {/* Quick Filter Counters */}
        <div className="text-right">
          <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-3 py-1.5 rounded-lg font-bold">
            {games.length} {games.length === 1 ? 'Game' : 'Games'} Found
          </span>
        </div>
      </div>

      {/* Filter and Genre Tabs */}
      <div className="space-y-4">
        {/* Genre Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-mono text-brand-muted shrink-0 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Genre:
          </span>
          {genres.map((g) => {
            const isActive = genre.toLowerCase() === g.toLowerCase();
            const href = `/games?genre=${g}${platform !== 'all' ? `&platform=${platform}` : ''}${sort !== 'popular' ? `&sort=${sort}` : ''}`;
            return (
              <Link
                key={g}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-all border ${
                  isActive
                    ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20'
                    : 'bg-brand-surface text-brand-muted border-brand-border hover:text-white hover:border-slate-700'
                }`}
              >
                {g === 'all' ? 'All Genres' : g}
              </Link>
            );
          })}
        </div>

        {/* Platform Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-mono text-brand-muted shrink-0 mr-1">Platform:</span>
          {platforms.map((p) => {
            const isActive = platform.toLowerCase() === p.toLowerCase();
            const href = `/games?${genre !== 'all' ? `genre=${genre}&` : ''}platform=${p}${sort !== 'popular' ? `&sort=${sort}` : ''}`;
            return (
              <Link
                key={p}
                href={href}
                className={`px-2.5 py-1 rounded text-xs font-mono shrink-0 transition-all border ${
                  isActive
                    ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/60 font-bold'
                    : 'bg-brand-surface text-brand-muted border-brand-border hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Systems' : p}
              </Link>
            );
          })}

          {/* Reset Filters Link if active */}
          {(genre !== 'all' || platform !== 'all' || query) && (
            <Link
              href="/games"
              className="text-xs font-mono text-brand-red hover:underline ml-auto shrink-0"
            >
              Reset Filters ✕
            </Link>
          )}
        </div>
      </div>

      {/* Main Grid */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} variant="default" />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Games Match Your Criteria"
          description="Try selecting a different genre or clearing your search filters to view our full catalogue."
          actionLabel="View All Games"
          actionHref="/games"
        />
      )}
    </div>
  );
}
