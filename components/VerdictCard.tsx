import React from 'react';
import type { Game } from '@/lib/types';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { ProsConsBox } from '@/components/ui/ProsConsBox';
import { Award, ExternalLink, ShoppingCart } from 'lucide-react';

interface VerdictCardProps {
  game: Game;
  className?: string;
}

export function VerdictCard({ game, className = '' }: VerdictCardProps) {
  const verdict = game.verdict;
  if (!verdict) return null;

  return (
    <div
      className={`rounded-2xl border border-brand-border bg-gradient-to-b from-brand-surface to-brand-bg p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-brand-red text-white">
              <Award className="w-3.5 h-3.5" />
              {verdict.badge || "Editors' Choice"}
            </span>
            {game.metacriticScore && (
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                Metacritic: {game.metacriticScore}
              </span>
            )}
          </div>
          <h3 className="font-heading text-2xl font-black text-white tracking-tight">
            GamerGrid Final Verdict
          </h3>
          <p className="text-xs text-brand-muted font-mono">
            Reviewed on {game.platforms.join(' / ')} • {game.developer}
          </p>
        </div>

        {/* Big Score Box */}
        <div className="flex items-center gap-4 bg-black/40 border border-brand-border px-5 py-3 rounded-xl backdrop-blur shrink-0">
          <div className="text-right">
            <p className="text-[10px] uppercase font-mono text-brand-muted">Editorial Score</p>
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              {game.score >= 9.5 ? 'Masterpiece' : game.score >= 9.0 ? 'Amazing' : game.score >= 8.0 ? 'Great' : 'Good'}
            </p>
          </div>
          <ScoreBadge score={game.score} variant="circle" size="lg" />
        </div>
      </div>

      {/* Summary Quote */}
      <blockquote className="border-l-4 border-brand-red pl-4 py-1 text-base md:text-lg text-slate-100 font-medium italic leading-relaxed relative z-10">
        &ldquo;{verdict.summary}&rdquo;
      </blockquote>

      {/* Pros & Cons Box */}
      {verdict.pros && verdict.cons && (
        <div className="relative z-10">
          <ProsConsBox pros={verdict.pros} cons={verdict.cons} />
        </div>
      )}

      {/* Purchase Links */}
      {game.purchaseLinks && Object.keys(game.purchaseLinks).length > 0 && (
        <div className="pt-4 border-t border-brand-border flex flex-wrap items-center gap-3 relative z-10">
          <span className="text-xs font-mono text-brand-muted flex items-center gap-1 mr-2">
            <ShoppingCart className="w-3.5 h-3.5 text-brand-cyan" /> Where to Buy:
          </span>
          {game.purchaseLinks.steam && (
            <a
              href={game.purchaseLinks.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-semibold text-white hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              Steam Store <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {game.purchaseLinks.playstation && (
            <a
              href={game.purchaseLinks.playstation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-semibold text-white hover:border-blue-400 hover:text-blue-400 transition-colors"
            >
              PlayStation Store <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {game.purchaseLinks.xbox && (
            <a
              href={game.purchaseLinks.xbox}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-semibold text-white hover:border-green-400 hover:text-green-400 transition-colors"
            >
              Xbox Store <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
