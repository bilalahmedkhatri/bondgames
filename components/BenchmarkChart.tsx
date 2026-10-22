/**
 * BenchmarkChart.tsx
 * Horizontal bar chart for GPU/CPU performance benchmarks.
 * Pure CSS bars — no chart library dependency.
 */
import React from 'react';
import type { BenchmarkResult } from '@/lib/types';

interface BenchmarkChartProps {
  results: BenchmarkResult[];
  unit?: string;
  title?: string;
  maxValue?: number;
  className?: string;
}

const PALETTE = [
  'from-brand-red to-brand-purple',
  'from-brand-cyan to-blue-500',
  'from-yellow-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-pink-400 to-rose-500',
];

export function BenchmarkChart({ results, unit = 'FPS', title, maxValue, className = '' }: BenchmarkChartProps) {
  const max = maxValue ?? Math.max(...results.map((r) => r.score)) * 1.15;

  return (
    <div className={`bg-brand-card border border-slate-800 rounded-xl p-5 ${className}`}>
      {title && (
        <h3 className="font-heading text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">{title}</h3>
      )}
      <div className="space-y-4">
        {results.map((r, i) => {
          const pct = Math.min((r.score / max) * 100, 100);
          const gradient = PALETTE[i % PALETTE.length];
          return (
            <div key={r.hardware}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-300 font-medium truncate pr-2">{r.hardware}</span>
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  {r.score.toLocaleString()} <span className="text-muted-text font-normal">{unit}</span>
                </span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
