import React from 'react';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsConsBox({ pros, cons, className = '' }: ProsConsBoxProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* Pros Column */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 text-emerald-400 font-heading font-bold text-base uppercase tracking-wider">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3>The Good (Pros)</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-slate-200">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-1 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Column */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 text-rose-400 font-heading font-bold text-base uppercase tracking-wider">
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
            <ThumbsDown className="w-4 h-4 text-rose-400" />
          </div>
          <h3>The Bad (Cons)</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-slate-200">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-1 w-4 h-4 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center shrink-0">
                <X className="w-3 h-3 text-rose-400" />
              </span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
