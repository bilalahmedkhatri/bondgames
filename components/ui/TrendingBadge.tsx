import React from 'react';
import { Flame } from 'lucide-react';

interface TrendingBadgeProps {
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function TrendingBadge({
  label = 'Trending',
  size = 'sm',
  className = '',
}: TrendingBadgeProps) {
  const sizeClass =
    size === 'xs'
      ? 'px-1.5 py-0.5 text-[10px] gap-1'
      : size === 'md'
      ? 'px-3 py-1 text-xs gap-1.5'
      : 'px-2 py-0.5 text-[11px] gap-1';

  return (
    <span
      className={`inline-flex items-center font-mono font-bold tracking-wider uppercase rounded-full bg-brand-red/15 text-brand-red border border-brand-red/40 shadow-sm shadow-brand-red/20 ${sizeClass} ${className}`}
    >
      <Flame className="w-3 h-3 text-brand-red animate-pulse" />
      <span>{label}</span>
    </span>
  );
}
