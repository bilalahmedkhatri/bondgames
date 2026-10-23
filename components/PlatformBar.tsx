'use client';

import React from 'react';
import Link from 'next/link';
import { SlidersHorizontal, Monitor, Gamepad2, Cpu, ShieldCheck } from 'lucide-react';

export function PlatformBar() {
  const platforms = [
    { label: 'PC Gaming', href: '/games?platform=pc', icon: Monitor, color: 'text-blue-400' },
    { label: 'PS5 Pro', href: '/games?platform=ps5', icon: Gamepad2, color: 'text-indigo-400' },
    { label: 'Xbox Series X', href: '/games?platform=xbox', icon: Gamepad2, color: 'text-emerald-400' },
    { label: 'Switch 2', href: '/games?platform=switch', icon: Gamepad2, color: 'text-rose-400' },
    { label: 'Tech & GPUs', href: '/hardware', icon: Cpu, color: 'text-amber-400' },
    { label: 'Top Metascores', href: '/games?sort=rating', icon: ShieldCheck, color: 'text-brand-red' }
  ];

  return (
    <div className="bg-brand-surface/70 border-b border-brand-border/60 py-2.5 px-4 hidden sm:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6 overflow-x-auto text-xs font-semibold uppercase tracking-wider text-brand-muted no-scrollbar">
          <span className="text-white font-bold flex items-center gap-1.5 shrink-0 text-[11px]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" /> Platforms:
          </span>
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.label}
                href={p.href}
                className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap text-[11px]"
              >
                <Icon className={`w-3.5 h-3.5 ${p.color}`} />
                <span>{p.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono text-brand-muted">
          <span className="text-brand-coral font-bold">• Unreal Engine 5.5 Ready</span>
        </div>
      </div>
    </div>
  );
}
