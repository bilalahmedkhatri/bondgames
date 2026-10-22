/**
 * ui/ScoreBadge.tsx
 * Circular or pill score badge — reused on GameCard, GameDetail hero, etc.
 */
import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'circle';
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 9.0) return 'text-brand-red border-brand-red bg-brand-red/10';
  if (score >= 7.5) return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
  if (score >= 6.0) return 'text-emerald-400 border-emerald-400 bg-emerald-400/10';
  return 'text-slate-400 border-slate-400 bg-slate-400/10';
}

function getScoreGlow(score: number) {
  if (score >= 9.0) return 'shadow-red-900/50';
  if (score >= 7.5) return 'shadow-yellow-900/50';
  return 'shadow-emerald-900/50';
}

export function ScoreBadge({ score, size = 'md', variant = 'pill', className = '' }: ScoreBadgeProps) {
  const color = getScoreColor(score);
  const glow = getScoreGlow(score);

  if (variant === 'circle') {
    const sizeClass = size === 'lg' ? 'w-20 h-20 text-2xl' : size === 'md' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm';
    return (
      <div
        className={`${sizeClass} ${color} rounded-full border-2 flex flex-col items-center justify-center font-heading font-extrabold shadow-lg ${glow} ${className}`}
      >
        <span>{score.toFixed(1)}</span>
        <span className="text-[9px] font-mono font-normal opacity-70">/10</span>
      </div>
    );
  }

  const sizeClass = size === 'lg' ? 'text-xl px-4 py-2' : size === 'md' ? 'text-sm px-3 py-1' : 'text-xs px-2 py-0.5';
  return (
    <span
      className={`${sizeClass} ${color} border rounded font-heading font-extrabold shadow-md ${className}`}
    >
      {score.toFixed(1)}
    </span>
  );
}
