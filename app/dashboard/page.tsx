import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GameCard } from '@/components/GameCard';
import { ArticleCard } from '@/components/ArticleCard';
import { getUserBookmarks, getUserActivityComments } from '@/lib/db/dashboard';
import { User, Bookmark, Heart, Cpu, MessageSquare, Shield, Award } from 'lucide-react';

export default async function DashboardPage() {
  const { games, articles } = await getUserBookmarks();
  const comments = await getUserActivityComments();

  return (
    <div className="max-w-7xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'Gamer Profile & Dashboard' }]} />

      {/* User Header Profile Card */}
      <section className="bg-gradient-to-r from-brand-surface via-brand-surface to-brand-bg border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-brand-red shadow-2xl shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Profile"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white">
                PixelKnight
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-brand-red/20 text-brand-red border border-brand-red/40 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Verified Enthusiast
              </span>
            </div>

            <p className="text-xs sm:text-sm text-brand-muted font-mono">
              Member since 2024 • 14 Reviews Scored • 84 Helpful Votes
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg bg-black/40 border border-brand-border text-xs font-mono text-brand-cyan">
                PC Master Rig: RTX 4080 Super / Ryzen 7800X3D
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/40 border border-brand-border text-xs font-mono text-brand-purple">
                Consoles: PS5 Pro + Steam Deck OLED
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bookmarked Games */}
      <section className="space-y-6">
        <SectionHeader
          title="Saved Game Watchlist"
          subtitle="Games you are tracking for price drops, reviews, and benchmark updates."
          href="/games"
          viewAllLabel="Browse Catalogue"
          accent="purple"
        />

        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} variant="default" />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-brand-surface border border-brand-border rounded-2xl text-brand-muted text-sm">
            No games in your watchlist yet. Browse the catalogue to add titles!
          </div>
        )}
      </section>

      {/* Bookmarked Articles */}
      <section className="space-y-6">
        <SectionHeader
          title="Saved Dispatches & Guides"
          subtitle="Hardware benchmarks and investigative stories pinned for offline reading."
          href="/news"
          viewAllLabel="All Articles"
          accent="red"
        />

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="feature" />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-brand-surface border border-brand-border rounded-2xl text-brand-muted text-sm">
            No saved articles. Click bookmark on any article to save for later!
          </div>
        )}
      </section>

      {/* Recent Comments / Activity */}
      {comments.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-brand-border">
          <SectionHeader
            title="Recent Community Contributions"
            subtitle="Your active comments and debate threads."
            accent="cyan"
          />

          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-brand-surface border border-brand-border space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-brand-cyan" />
                    Comment on {c.targetType === 'game' ? 'Game Review' : 'Editorial Article'}
                  </span>
                  <span>{c.createdAt}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{c.content}&rdquo;
                </p>
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  +{c.upvotes} Upvotes from community
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
