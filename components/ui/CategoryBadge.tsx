/**
 * ui/CategoryBadge.tsx
 * Colorful genre/category pill tag — reused on cards and article pages.
 */
import React from 'react';

interface CategoryBadgeProps {
  label: string;
  variant?: 'solid' | 'outline' | 'glow';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Action': 'bg-red-500/20 text-red-400 border-red-500/40',
  'RPG': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  'Strategy': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  'Sports': 'bg-green-500/20 text-green-400 border-green-500/40',
  'Horror': 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  'Puzzle': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  'Simulation': 'bg-teal-500/20 text-teal-400 border-teal-500/40',
  'Adventure': 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  'FPS': 'bg-pink-500/20 text-pink-400 border-pink-500/40',
  'MOBA': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  'Review': 'bg-brand-red/20 text-brand-red border-brand-red/40',
  'News': 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
  'Feature': 'bg-brand-purple/20 text-brand-purple border-brand-purple/40',
  'Hardware': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
};

function getColor(label: string): string {
  return CATEGORY_COLORS[label] ?? 'bg-slate-700/50 text-slate-300 border-slate-600';
}

export function CategoryBadge({ label, size = 'sm', className = '', onClick }: CategoryBadgeProps) {
  const sizeClass = size === 'md' ? 'px-3 py-1 text-xs' : size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-[10px]';
  const interactive = onClick ? 'cursor-pointer hover:brightness-125 transition-all' : '';
  return (
    <span
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`inline-flex items-center ${sizeClass} border rounded font-semibold tracking-wide uppercase ${getColor(label)} ${interactive} ${className}`}
    >
      {label}
    </span>
  );
}
