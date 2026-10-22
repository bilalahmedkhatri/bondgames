/**
 * CommunityPoll.tsx
 * Animated poll widget with vote submission — uses /api/polls endpoint.
 */
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Users } from 'lucide-react';

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

interface CommunityPollProps {
  pollId: string;
  question: string;
  options: PollOption[];
  totalVotes?: number;
  className?: string;
}

export function CommunityPoll({ pollId, question, options: initialOptions, totalVotes: initialTotal = 0, className = '' }: CommunityPollProps) {
  const [options, setOptions] = useState(initialOptions);
  const [totalVotes, setTotalVotes] = useState(initialTotal);
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const total = Math.max(totalVotes, options.reduce((a, o) => a + o.votes, 0));

  async function handleVote(optionId: string) {
    if (voted || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, optionId }),
      });
      if (res.ok) {
        setOptions((prev) => prev.map((o) => o.id === optionId ? { ...o, votes: o.votes + 1 } : o));
        setTotalVotes((v) => v + 1);
        setVoted(optionId);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`bg-brand-card border border-slate-800 rounded-xl p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">Community Poll</span>
      </div>

      <p className="font-heading text-sm font-bold text-white mb-4 leading-snug">{question}</p>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted = voted === opt.id;
          const hasVoted = voted !== null;

          return (
            <div key={opt.id}>
              {hasVoted ? (
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-700 ${isVoted ? 'bg-brand-red/20 border border-brand-red/50' : 'bg-slate-800/60'}`}
                    style={{ width: `${pct}%` }}
                  />
                  <div className="relative flex items-center justify-between px-3 py-2.5">
                    <span className={`text-sm font-medium ${isVoted ? 'text-white' : 'text-slate-400'}`}>
                      {isVoted && '✓ '}{opt.label}
                    </span>
                    <span className="text-sm font-bold text-white">{pct}%</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleVote(opt.id)}
                  disabled={loading}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-slate-700 hover:border-brand-cyan hover:bg-brand-cyan/5 text-sm text-slate-300 hover:text-white transition-all"
                >
                  {opt.label}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-text">
        <Users className="w-3.5 h-3.5" />
        <span>{total.toLocaleString()} votes</span>
        {voted && <span className="ml-auto text-brand-cyan">Thanks for voting!</span>}
      </div>
    </div>
  );
}
