import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Clock, MessageSquare, ArrowRight } from 'lucide-react';

interface HeroLeadArticleProps {
  article: Article;
  className?: string;
}

export function HeroLeadArticle({ article, className = '' }: HeroLeadArticleProps) {
  return (
    <article
      className={`group relative bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end ${className}`}
    >
      {/* Background Cover Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black min-h-[380px] md:min-h-[460px]">
        <Image
          src={article.coverImage || article.thumbnail}
          alt={article.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          sizes="(max-width: 1024px) 100vw, 75vw"
        />
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-transparent to-transparent hidden md:block" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          {article.isBreaking && (
            <span className="bg-brand-red text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Breaking Report
            </span>
          )}
          {article.platform && (
            <span className="bg-black/70 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-white/10">
              {article.platform}
            </span>
          )}
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3 z-10">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-muted">
            <span className="text-brand-red font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span>•</span>
            <span className="text-white font-medium">By {article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-amber" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-brand-cyan">
              <MessageSquare className="w-3.5 h-3.5" />
              {article.commentCount} Comments
            </span>
          </div>

          {/* Heading */}
          <Link href={`/news/${article.slug}`}>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight hover:text-brand-red transition-colors cursor-pointer line-clamp-3">
              {article.title}
            </h1>
          </Link>

          {/* Subtitle / Excerpt */}
          <p className="text-brand-muted text-sm md:text-base line-clamp-2 max-w-3xl leading-relaxed">
            {article.excerpt}
          </p>

          {/* CTA Link */}
          <div className="pt-2">
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-brand-cyan transition-colors"
            >
              <span>Read Full Investigation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
