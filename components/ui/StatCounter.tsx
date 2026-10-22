import React from 'react';
import { Eye, MessageSquare, ThumbsUp, Flame } from 'lucide-react';

interface StatCounterProps {
  type: 'views' | 'comments' | 'upvotes' | 'hype';
  count: number;
  className?: string;
  size?: 'sm' | 'md';
}

function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function StatCounter({
  type,
  count,
  className = '',
  size = 'sm',
}: StatCounterProps) {
  const iconSize = size === 'md' ? 'w-4 h-4' : 'w-3 h-3';
  const textSize = size === 'md' ? 'text-xs' : 'text-[11px]';

  const config = {
    views: { icon: Eye, color: 'text-brand-muted', suffix: '' },
    comments: { icon: MessageSquare, color: 'text-brand-cyan', suffix: '' },
    upvotes: { icon: ThumbsUp, color: 'text-emerald-400', suffix: '' },
    hype: { icon: Flame, color: 'text-brand-red', suffix: '' },
  }[type];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono ${textSize} ${config.color} ${className}`}
      title={`${count.toLocaleString()} ${type}`}
    >
      <Icon className={iconSize} />
      <span>{formatCount(count)}</span>
    </span>
  );
}
