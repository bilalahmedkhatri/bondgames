import React, { cache } from 'react';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGameBySlug, getGames } from '@/lib/db/games';
import { getCommentsByTarget } from '@/lib/db/comments';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { PlatformList } from '@/components/ui/PlatformIcon';
import { VerdictCard } from '@/components/VerdictCard';
import { SpecsTable } from '@/components/ui/SpecsTable';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { CommentSection } from '@/components/CommentSection';
import { GameCard } from '@/components/GameCard';
import {
  Calendar,
  Building,
  Monitor,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

const getGame = cache(getGameBySlug);

export async function generateMetadata({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) notFound();
  return pageMetadata({ title: `${game.title} — Game Details & PC Requirements`, description: game.excerpt, path: `/games/${game.slug}`, image: game.heroImage || game.coverImage });
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  const [comments, allGames] = await Promise.all([
    getCommentsByTarget(game.id, 'game'),
    getGames(),
  ]);

  const relatedGames = allGames
    .filter((g) => g.id !== game.id && g.genres.some((genre) => game.genres.includes(genre)))
    .slice(0, 4);

  const mappedComments = comments.map((c) => ({
    id: c.id,
    author: c.authorName,
    content: c.content,
    createdAt: c.createdAt,
    upvotes: c.upvotes,
    downvotes: c.downvotes,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'VideoGame',
        name: game.title, description: game.excerpt, image: game.heroImage || game.coverImage,
        url: absoluteUrl(`/games/${game.slug}`), genre: game.genres, gamePlatform: game.platforms,
        author: { '@type': 'Organization', name: game.developer },
        publisher: { '@type': 'Organization', name: game.publisher },
      }} />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Game Catalogue', href: '/games' },
          { label: game.genres[0] || 'Games', href: `/games?genre=${game.genres[0]}` },
          { label: game.title },
        ]}
      />

      {/* Hero Header Banner */}
      <section className="relative rounded-3xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl">
        {/* Hero Background image with gradient */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full min-h-[380px] bg-black">
          <Image
            src={game.heroImage || game.coverImage}
            alt={game.title}
            fill
            priority
            className="object-cover opacity-75"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-surface via-transparent to-transparent hidden sm:block" />

          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {game.genres.map((g) => (
                  <CategoryBadge key={g} label={g} size="sm" />
                ))}
                {game.trending && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-red text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Trending
                  </span>
                )}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {game.title}
              </h1>

              {game.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-medium">
                  {game.subtitle}
                </p>
              )}

              {/* Developer / Date meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-muted pt-1">
                <span className="flex items-center gap-1.5 text-white">
                  <Building className="w-3.5 h-3.5 text-brand-cyan" />
                  {game.developer} ({game.publisher})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-amber" />
                  {game.releaseDate} ({game.releaseStatus})
                </span>
                <span>•</span>
                <PlatformList platforms={game.platforms} max={4} />
              </div>
            </div>

            {/* Score Box */}
            <div className="flex items-center gap-4 bg-black/70 border border-brand-border px-6 py-4 rounded-2xl backdrop-blur shrink-0 shadow-xl">
              <div className="text-right">
                <p className="text-[10px] uppercase font-mono text-brand-muted">Editorial Score</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {game.verdict?.badge || 'Scored'}
                </p>
                {game.metacriticScore && (
                  <p className="text-[10px] font-mono text-yellow-400 mt-0.5">
                    Metacritic: {game.metacriticScore}
                  </p>
                )}
              </div>
              <ScoreBadge score={game.score} variant="circle" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Detail Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (8 cols): Overview, Verdict, Specs, Comments */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview text */}
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white border-l-4 border-brand-purple pl-3">
              Overview & Critical Summary
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {game.description}
            </p>
          </section>

          {/* Editorial Verdict Card */}
          <section className="space-y-4">
            <VerdictCard game={game} />
          </section>

          {/* System Requirements Table */}
          {game.specs && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-brand-cyan" />
                <h2 className="font-heading text-2xl font-bold text-white">
                  System Requirements (PC)
                </h2>
              </div>
              <SpecsTable specs={game.specs} />
            </section>
          )}

          {/* Share & Social */}
          <div className="pt-4 border-t border-brand-border flex items-center justify-between">
            <ShareButtons title={`Check out the review for ${game.title} on GamerGrid`} />
          </div>

          {/* Discussion Section */}
          <section className="pt-4 border-t border-brand-border">
            <CommentSection
              targetId={game.id}
              targetType="game"
              initialComments={mappedComments}
            />
          </section>
        </div>

        {/* Right Column (4 cols): Quick Info Box + Related Games */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Specifications Card */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b border-brand-border pb-3">
              Quick Facts
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                <span className="text-brand-muted">Developer</span>
                <span className="text-white font-semibold">{game.developer}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                <span className="text-brand-muted">Publisher</span>
                <span className="text-white font-semibold">{game.publisher}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                <span className="text-brand-muted">Release Date</span>
                <span className="text-white font-semibold">{game.releaseDate}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                <span className="text-brand-muted">Status</span>
                <span className="text-brand-cyan font-bold">{game.releaseStatus}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                <span className="text-brand-muted">Platforms</span>
                <span className="text-white">{game.platforms.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-brand-muted">Genres</span>
                <span className="text-brand-purple font-semibold">{game.genres.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Related Games in Same Genre */}
          {relatedGames.length > 0 && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b border-brand-border pb-3 flex items-center justify-between">
                <span>Similar Titles</span>
                <Link href="/games" className="text-xs text-brand-cyan font-mono hover:underline">
                  More →
                </Link>
              </h3>
              <div className="space-y-3">
                {relatedGames.map((rel) => (
                  <GameCard key={rel.id} game={rel} variant="horizontal" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
