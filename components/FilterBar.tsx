/**
 * FilterBar.tsx
 * Horizontal scrollable filter chips — genre, platform, sort.
 */
'use client';
import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  label?: string;
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  allowAll?: boolean;
  allLabel?: string;
  className?: string;
}

export function FilterBar({
  label,
  options,
  selected,
  onChange,
  allowAll = true,
  allLabel = 'All',
  className = '',
}: FilterBarProps) {
  const allOptions = allowAll ? [{ value: '', label: allLabel }, ...options] : options;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <div className="flex items-center gap-1.5 text-xs text-muted-text flex-shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{label}</span>
        </div>
      )}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {allOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              selected === opt.value
                ? 'bg-brand-red border-brand-red text-white shadow-md shadow-brand-red/30'
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300 bg-transparent'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {selected && (
        <button onClick={() => onChange('')} className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-text hover:text-white transition-colors">
          <X className="w-3.5 h-3.5" /> Clear
        </button>
      )}
    </div>
  );
}
