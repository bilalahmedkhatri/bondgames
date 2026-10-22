'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Game } from '@/lib/types';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { PlatformList } from '@/components/ui/PlatformIcon';
import { Flame, ChevronRight } from 'lucide-react';

interface TrendingGamesRailProps {
  games: Game[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TrendingGamesRail({
  games,
  title = 'Trending Titles This Week',
  subtitle = 'Top rated and most played games across PC, PlayStation, and Xbox',
  className = '',
}: TrendingGamesRailProps) {
  const trendingGames = games.filter((g) => g.trending || g.score >= 9.0).slice(0, 6);

  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1 text-brand-red font-mono text-xs font-bold uppercase tracking-widest">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>Hot In Gaming</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-brand-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        <Link
          href="/games?filter=trending"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-cyan hover:text-white transition-colors"
        >
          View Ranking <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {trendingGames.map((game, index) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="group block relative bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-red/60 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-brand-red/10"
          >
            {/* Rank badge */}
            <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-md bg-black/80 backdrop-blur border border-white/20 flex items-center justify-center text-xs font-mono font-black text-white">
              #{index + 1}
            </div>

            {/* Score top-right */}
            <div className="absolute top-2 right-2 z-10">
              <ScoreBadge score={game.score} size="sm" />
            </div>

            {/* Cover */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-90" />
            </div>

            {/* Info */}
            <div className="p-3 space-y-1">
              <h3 className="font-heading text-xs font-bold text-white truncate group-hover:text-brand-red transition-colors">
                {game.title}
              </h3>
              <div className="flex items-center justify-between pt-1">
                <PlatformList platforms={game.platforms} max={2} />
                <span className="text-[10px] font-mono text-brand-muted">
                  {game.releaseStatus}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
