/**
 * Pagination.tsx
 * Numbered pagination bar with prev/next — purely presentational.
 */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1 <= 5 ? i + 1 : i + 1 === 6 ? -1 : totalPages;
    if (page >= totalPages - 3) return i === 0 ? 1 : i === 1 ? -1 : totalPages - 4 + (i - 2);
    return i === 0 ? 1 : i === 1 ? -1 : i === 5 ? -2 : i === 6 ? totalPages : page - 2 + (i - 2);
  });

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) =>
        p < 0 ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-muted-text">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${
              p === page
                ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/30'
                : 'border-slate-700 text-slate-400 hover:border-brand-cyan hover:text-brand-cyan'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
