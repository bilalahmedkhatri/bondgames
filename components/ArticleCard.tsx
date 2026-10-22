/**
 * ArticleCard.tsx
 * Reusable article/news card — list, feature, and mini variants.
 */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Clock, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'feature' | 'list' | 'mini';
  className?: string;
}

function FeatureCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <div className="bg-brand-card border border-slate-800 rounded-xl overflow-hidden hover:border-brand-cyan/50 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300">
        <div className="relative h-52 overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="600px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <CategoryBadge label={article.category} />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-heading text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-text line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-text">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m read</span>
            <span className="ml-auto">{article.publishedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <div className="flex gap-4 p-4 bg-brand-card border border-slate-800 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-800/50 transition-all duration-200">
        <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="112px" />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <CategoryBadge label={article.category} size="xs" />
          <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-brand-cyan transition-colors leading-snug">
            {article.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-muted-text">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.publishedAt}</span>
            <span className="ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MiniCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <div className="flex gap-3 items-start py-3 border-b border-slate-800 last:border-0 hover:opacity-80 transition-opacity">
        <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white line-clamp-2 group-hover:text-brand-cyan transition-colors leading-snug">
            {article.title}
          </p>
          <p className="text-[10px] text-muted-text mt-1">{article.publishedAt}</p>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCard({ article, variant = 'feature', className = '' }: ArticleCardProps) {
  return (
    <div className={className}>
      {variant === 'feature' && <FeatureCard article={article} />}
      {variant === 'list' && <ListCard article={article} />}
      {variant === 'mini' && <MiniCard article={article} />}
    </div>
  );
}
