/**
 * Sidebar.tsx
 * Reusable right sidebar assembled from widgets.
 * Used on: Home, News Feed, Game Detail, Article page.
 */
import React from 'react';
import type { Article, Game } from '@/lib/types';
import { ArticleCard } from '@/components/ArticleCard';
import { GameCard } from '@/components/GameCard';
import { CommunityPoll } from '@/components/CommunityPoll';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Flame, Trophy } from 'lucide-react';

interface SidebarProps {
  trendingGames?: Game[];
  recentArticles?: Article[];
  poll?: {
    id: string;
    question: string;
    options: { id: string; label: string; votes: number }[];
    totalVotes: number;
  };
  className?: string;
}

export function Sidebar({ trendingGames, recentArticles, poll, className = '' }: SidebarProps) {
  return (
    <aside className={`space-y-8 ${className}`}>
      {/* Trending Games */}
      {trendingGames && trendingGames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-brand-red" />
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-widest">Trending</h3>
          </div>
          <div className="space-y-2">
            {trendingGames.slice(0, 5).map((g) => (
              <GameCard key={g.id} game={g} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* Community Poll */}
      {poll && (
        <CommunityPoll
          pollId={poll.id}
          question={poll.question}
          options={poll.options}
          totalVotes={poll.totalVotes}
        />
      )}

      {/* Recent Articles */}
      {recentArticles && recentArticles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-brand-cyan" />
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-widest">Latest News</h3>
          </div>
          <div>
            {recentArticles.slice(0, 5).map((a) => (
              <ArticleCard key={a.id} article={a} variant="mini" />
            ))}
          </div>
        </div>
      )}

      {/* Ad Placeholder */}
      {/* <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[200px]">
        <span className="text-xs font-mono text-muted-text uppercase tracking-widest">Advertisement</span>
        <span className="text-xs text-slate-600">300 × 250</span>
      </div> */}
    </aside>
  );
}
