import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost, listPosts } from '@/lib/blog/queries';
import { postArticle } from '@/lib/blog/adapter';
import { BlogContent } from '@/lib/blog/renderer';
import { postSeo } from '@/lib/blog/seo';
import { getCommentsByTarget } from '@/lib/db/comments';
import { getGames } from '@/lib/db/games';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { AuthorByline } from '@/components/ui/AuthorByline';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { CommentSection } from '@/components/CommentSection';
import { Sidebar } from '@/components/Sidebar';
import { ArticleCard } from '@/components/ArticleCard';
import { ArticleCover } from '@/components/ArticleCover';
import { Tag, CheckCircle2 } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getPost('en', slug);
  if (!result) notFound();
  return postSeo(result.post).metadata;
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getPost('en', slug);
  const article = result ? postArticle(result.post, result.document) : null;

  if (!article || !result) {
    notFound();
  }

  const [comments, listing, games] = await Promise.all([
    getCommentsByTarget(article.id, 'article'),
    listPosts('en'),
    getGames(),
  ]);

  const allArticles = listing.posts.map(post => postArticle(post));
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
    <article className="max-w-7xl mx-auto lg:px-0 md:px-4 p-3 space-y-8">
      <JsonLd data={postSeo(result.post).jsonLd} />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'News Hub', href: '/news' },
          { label: article.category, href: `/news?category=${encodeURIComponent(result.post.category_slug || 'all')}` },
          { label: article.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="min-w-0 lg:col-span-8 space-y-8">
          {/* Article Header Container */}
          <header className="space-y-4">
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
                showAvatar={Boolean(article.authorAvatar)}
              />

              <div className="flex items-center gap-4">
                <ShareButtons title={article.title} />
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          <ArticleCover
            src={article.coverImage || article.thumbnail}
            alt={result.post.cover?.alt_text || article.title}
            caption={result.post.cover?.caption}
            attribution={result.post.metadata_json?.cover_attribution}
          />

          <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed space-y-6 text-base sm:text-lg">
            <BlogContent document={result.document} assets={result.assets} />
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
                src={article.authorAvatar || '/social-image'}
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
              {article.authorDescription && (
                <p className="text-sm text-brand-muted leading-relaxed">{article.authorDescription}</p>
              )}
            </div>
          </div>

          {article.highlights && article.highlights.length > 0 && (
            <aside className="rounded-2xl border border-brand-cyan/30 bg-brand-surface p-6 shadow-lg" aria-label="Article highlights">
              <h2 className="font-heading text-lg font-bold text-white mb-3">Key highlights</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
                {article.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </aside>
          )}

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
            recentArticles={allArticles.filter(post => post.id !== article.id && !relatedArticles.some(related => related.id === post.id)).slice(0, 4)}
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
