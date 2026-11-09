import React from 'react';
import Image from 'next/image';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

const publicationDateTime = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
  timeZoneName: 'short',
});

interface AuthorBylineProps {
  author: string;
  authorAvatar?: string;
  authorRole?: string;
  publishedAt: string;
  readTime?: number;
  className?: string;
  showAvatar?: boolean;
}

export function AuthorByline({
  author,
  authorAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  authorRole = 'Staff Writer',
  publishedAt,
  readTime,
  className = '',
  showAvatar = true,
}: AuthorBylineProps) {
  const date = new Date(publishedAt);
  const hasValidDate = Number.isFinite(date.getTime());

  return (
    <div className={`flex items-center gap-3 text-xs text-brand-muted ${className}`}>
      {showAvatar && (
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-border shrink-0">
          <Image
            src={authorAvatar}
            alt={author}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 font-semibold text-white">
          <span>{author}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
          {authorRole && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-brand-surface border border-brand-border text-brand-cyan">
              {authorRole}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-brand-muted mt-0.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 shrink-0" />
            {hasValidDate ? (
              <time dateTime={date.toISOString()}>{publicationDateTime.format(date)}</time>
            ) : publishedAt}
          </span>
          {typeof readTime === 'number' && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="w-3 h-3 text-brand-amber" />
              {readTime} min read
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
