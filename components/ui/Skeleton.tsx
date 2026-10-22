/**
 * ui/Skeleton.tsx
 * Shimmer loading skeleton placeholders.
 */
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] rounded ${className}`}
      style={{ animation: 'shimmer 1.5s infinite' }}
    />
  );
}

export function GameCardSkeleton() {
  return (
    <div className="bg-brand-card border border-slate-800 rounded-xl overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-7 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-brand-card border border-slate-800 rounded-xl overflow-hidden flex gap-4 p-4">
      <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
