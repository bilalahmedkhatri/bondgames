/**
 * ui/SectionHeader.tsx
 * Standardized section heading with optional "View All" link.
 */
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  viewAllLabel?: string;
  accent?: 'red' | 'purple' | 'cyan';
  className?: string;
}

const ACCENT = {
  red: 'border-brand-red',
  purple: 'border-brand-purple',
  cyan: 'border-brand-cyan',
};

export function SectionHeader({
  title,
  subtitle,
  href,
  viewAllLabel = 'View All',
  accent = 'red',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 ${className}`}>
      <div className="min-w-0">
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r from-brand-red to-brand-purple mb-3`} />
        <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-white border-l-4 pl-3 break-words ${ACCENT[accent]}`}>
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-muted-text mt-1.5 break-words">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-cyan hover:text-white transition-colors group shrink-0 self-start sm:self-auto"
        >
          {viewAllLabel}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
