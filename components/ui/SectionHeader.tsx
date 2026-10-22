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
    <div className={`flex items-end justify-between mb-6 ${className}`}>
      <div>
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r from-brand-red to-brand-purple mb-3`} />
        <h2 className={`font-heading text-2xl md:text-3xl font-extrabold text-white border-l-4 pl-3 ${ACCENT[accent]}`}>
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted-text mt-1">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan hover:text-white transition-colors group"
        >
          {viewAllLabel}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
