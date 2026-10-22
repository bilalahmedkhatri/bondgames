import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/db/articles';
import { getCommentsByTarget } from '@/lib/db/comments';
import { getGames } from '@/lib/db/games';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { AuthorByline } from '@/components/ui/AuthorByline';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { CommentSection } from '@/components/CommentSection';
import { Sidebar } from '@/components/Sidebar';
import { ArticleCard } from '@/components/ArticleCard';
import { Clock, Eye, MessageSquare, Tag, CheckCircle2 } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [comments, allArticles, games] = await Promise.all([
    getCommentsByTarget(article.id, 'article'),
    getArticles(),
    getGames(),
  ]);

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Map comments for CommentSection
  const mappedComments = comments.map((c) => ({
    id: c.id,
    author: c.authorName,
    content: c.content,
    createdAt: c.createdAt,
    upvotes: c.upvotes,
    downvotes: c.downvotes,
  }));

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'News Hub', href: '/news' },
          { label: article.category, href: `/news?category=${article.category}` },
          { label: article.title },
        ]}
      />

      {/* Article Header Container */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge label={article.category} size="md" />
          {article.isBreaking && (
            <span className="px-2.5 py-1 rounded bg-brand-red text-white text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-red/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Breaking
            </span>
          )}
          {article.platform && (
            <span className="px-2.5 py-1 rounded bg-brand-surface border border-brand-border text-brand-muted text-xs font-mono font-bold uppercase">
              {article.platform}
            </span>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {article.subtitle}
        </p>

        {/* Author Byline & Article Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-brand-border">
          <AuthorByline
            author={article.author}
            authorAvatar={article.authorAvatar}
            authorRole={article.authorRole}
            publishedAt={article.publishedAt}
            readTime={article.readTime}
          />

          <div className="flex items-center gap-4">
            <ShareButtons title={article.title} />
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full max-h-[520px] rounded-2xl overflow-hidden border border-brand-border shadow-2xl bg-black">
        <Image
          src={article.coverImage || article.thumbnail}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Article Body */}
        <div className="lg:col-span-8 space-y-8">
          <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed space-y-6 text-base sm:text-lg">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h2
                    key={index}
                    className="font-heading text-2xl sm:text-3xl font-extrabold text-white pt-4 pb-2 border-l-4 border-brand-red pl-3 tracking-tight"
                  >
                    {paragraph.replace('### ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n');
                return (
                  <ul key={index} className="space-y-2 my-4 pl-4">
                    {listItems.map((li, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-base">
                        <span className="text-brand-cyan font-bold">•</span>
                        <span>{li.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\.\s/)) {
                const listItems = paragraph.split('\n');
                return (
                  <ol key={index} className="space-y-3 my-4 pl-4">
                    {listItems.map((li, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-base">
                        <span className="text-brand-red font-mono font-bold">{i + 1}.</span>
                        <span>{li.replace(/^\d+\.\s/, '')}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-brand-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-brand-muted flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-brand-cyan" /> Filed Under:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-brand-surface border border-brand-border text-xs font-mono text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-red shrink-0 shadow-lg">
              <Image
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                alt={article.author}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="font-heading text-lg font-bold text-white">
                  {article.author}
                </h4>
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
              </div>
              <p className="text-xs font-mono text-brand-cyan uppercase">
                {article.authorRole || 'Editorial Staff'}
              </p>
              <p className="text-sm text-brand-muted leading-relaxed">
                Covering technical deep-dives, industry shifts, and hardware engineering across PC and console ecosystems. GamerGrid verified journalist.
              </p>
            </div>
          </div>

          {/* Live Discussion & Comment Section */}
          <div className="pt-6 border-t border-brand-border">
            <CommentSection
              targetId={article.id}
              targetType="article"
              initialComments={mappedComments}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Sidebar
            trendingGames={games.slice(0, 4)}
            recentArticles={allArticles.slice(0, 4)}
          />

          {/* Related Articles in this category */}
          {relatedArticles.length > 0 && (
            <div className="bg-brand-surface border border-brand-border rounded-xl p-5 space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brand-cyan pl-2">
                More in {article.category}
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} variant="mini" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
