/**
 * GameCard.tsx
 * Reusable card used on Home, Catalogue, and Search pages.
 * Variants: 'default' (vertical), 'horizontal' (sidebar), 'hero' (large feature card).
 */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Game } from '@/lib/types';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { PlatformList } from '@/components/ui/PlatformIcon';
import { Calendar, TrendingUp } from 'lucide-react';

interface GameCardProps {
  game: Game;
  variant?: 'default' | 'horizontal' | 'hero';
  className?: string;
}

/* ── Vertical Card ─────────────────────────────────────────────── */
function DefaultCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`} className="block group">
      <div className="bg-brand-card border border-slate-800 rounded-xl overflow-hidden hover:border-brand-purple/60 hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-300">
        {/* Cover Image */}
        <div className="relative overflow-hidden h-48">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          {/* Score pinned bottom-right */}
          <div className="absolute bottom-3 right-3">
            <ScoreBadge score={game.score} variant="circle" size="sm" />
          </div>
          {/* Platform list top-left */}
          <div className="absolute top-3 left-3">
            <PlatformList platforms={game.platforms} max={2} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          <h3 className="font-heading text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {game.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {game.genres.slice(0, 2).map((g) => (
              <CategoryBadge key={g} label={g} size="xs" />
            ))}
          </div>
          <div className="flex items-center justify-between pt-1 text-xs text-muted-text">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {game.releaseDate}
            </span>
            {game.trending && (
              <span className="flex items-center gap-1 text-brand-red">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Horizontal Card (sidebar / list) ──────────────────────────── */
function HorizontalCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`} className="block group">
      <div className="flex gap-3 p-3 bg-brand-card border border-slate-800 rounded-xl hover:border-brand-purple/50 hover:bg-slate-800/60 transition-all duration-200">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={game.coverImage} alt={game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="80px" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="text-sm font-semibold text-white truncate group-hover:text-brand-cyan transition-colors">
            {game.title}
          </h4>
          <CategoryBadge label={game.genres[0]} size="xs" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-text">{game.releaseDate}</span>
            <ScoreBadge score={game.score} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Hero Card (large feature) ─────────────────────────────────── */
function HeroCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`} className="block group relative h-[480px] rounded-2xl overflow-hidden">
      <Image src={game.coverImage} alt={game.title} fill className="object-cover group-hover:scale-103 transition-transform duration-700" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 gap-4">
        <PlatformList platforms={game.platforms} />
        <div className="flex flex-wrap gap-2">
          {game.genres.map((g) => <CategoryBadge key={g} label={g} />)}
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
          {game.title}
        </h2>
        <p className="text-slate-300 text-sm md:text-base line-clamp-2 max-w-2xl">{game.description}</p>
        <div className="flex items-center gap-4">
          <ScoreBadge score={game.score} variant="circle" size="lg" />
          <span className="font-heading text-white text-lg">Editorial Score</span>
        </div>
      </div>
    </Link>
  );
}

export function GameCard({ game, variant = 'default', className = '' }: GameCardProps) {
  return (
    <div className={className}>
      {variant === 'default' && <DefaultCard game={game} />}
      {variant === 'horizontal' && <HorizontalCard game={game} />}
      {variant === 'hero' && <HeroCard game={game} />}
    </div>
  );
}
