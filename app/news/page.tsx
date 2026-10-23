import React from 'react';
import { pageMetadata } from '@/lib/seo';

import { getArticles } from '@/lib/db/articles';
import { getGames } from '@/lib/db/games';
import { getPoll } from '@/lib/db/poll';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArticleCard } from '@/components/ArticleCard';
import { HeroLeadArticle } from '@/components/HeroLeadArticle';
import { Sidebar } from '@/components/Sidebar';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import Link from 'next/link';

export async function generateMetadata({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const filtered = Boolean(params.category && params.category.toLowerCase() !== 'all');
  const metadata = pageMetadata({"title":"Gaming News & Industry Reports","description":"Read gaming news, hardware reports, game previews, features and industry updates from GamerGrid.","path":"/news", noIndex: filtered });
  if (filtered) delete metadata.alternates;
  return metadata;
}

interface NewsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function NewsHubPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const currentCategory = params.category || 'all';

  const [allArticles, games, poll] = await Promise.all([
    getArticles({ category: currentCategory !== 'all' ? currentCategory : undefined }),
    getGames(),
    getPoll(),
  ]);

  const categories = ['all', 'News', 'Hardware', 'Review', 'Preview', 'Industry', 'Deals', 'Feature'];

  const leadArticle = currentCategory === 'all' ? allArticles[0] : null;
  const gridArticles = leadArticle ? allArticles.slice(1) : allArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'News & Editorial Hub' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-red">
            Gaming Journalism & Dispatches
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Gaming News & Industry Reports
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Breaking updates, investigative reporting, hardware deep-dives, and hands-on impressions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
            const href = cat === 'all' ? '/news' : `/news?category=${cat}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20'
                    : 'bg-brand-surface text-brand-muted border-brand-border hover:text-white hover:border-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Dispatches' : cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Lead Story (if viewing all) */}
      {leadArticle && (
        <div>
          <HeroLeadArticle article={leadArticle} />
        </div>
      )}

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span>
                {currentCategory === 'all' ? 'Latest Stories' : `${currentCategory} Coverage`}
              </span>
              <span className="text-xs font-mono text-brand-muted font-normal">
                ({allArticles.length} stories)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="feature" />
            ))}
          </div>

          {gridArticles.length === 0 && (
            <div className="text-center py-16 bg-brand-surface border border-brand-border rounded-xl">
              <p className="text-brand-muted">No articles found in this category.</p>
              <Link href="/news" className="text-xs font-mono text-brand-cyan hover:underline mt-2 inline-block">
                ← View all stories
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Sidebar
            trendingGames={games.slice(0, 5)}
            recentArticles={allArticles.slice(0, 4)}
            poll={poll}
          />
        </div>
      </div>
    </div>
  );
}
