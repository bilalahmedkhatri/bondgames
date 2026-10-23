'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function TopTicker() {
  const [currentDate, setCurrentDate] = useState('Oct 22, 2026');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }));
  }, []);

  return (
    <div className="border-b border-brand-border bg-black/90 text-xs py-2 px-4 font-mono z-30 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="bg-brand-red text-white px-2.5 py-0.5 font-extrabold uppercase text-[10px] tracking-widest shrink-0 flex items-center gap-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            BREAKING
          </span>
          <div className="overflow-hidden relative w-[280px] sm:w-[480px] md:w-[650px] lg:w-[800px] text-brand-muted text-xs">
            <div className="animate-ticker space-x-8">
              <Link href="/news/gta-vi-leaks-ps5-pro-60fps" className="hover:text-white transition-colors">
                GTA VI Leaks: Rockstar Reportedly Targeting 60FPS Mode on PS5 Pro
              </Link>
              <span>•</span>
              <Link href="/news/nvidia-rtx-5090-specs-benchmark-leak" className="hover:text-white transition-colors">
                NVIDIA RTX 5090 Specs Allegedly Revealed: 32GB GDDR7 & 512-bit Bus
              </Link>
              <span>•</span>
              <Link href="/games/monster-hunter-wilds" className="hover:text-white transition-colors">
                Monster Hunter Wilds Hands-On: 20 Hours in Dynamic Ecosystem
              </Link>
              <span>•</span>
              <Link href="/games/cyberpunk-2077-phantom-liberty" className="hover:text-white transition-colors">
                Cyberpunk 2077 Sequel 'Project Orion' Enters Full Pre-Production
              </Link>
              <span>•</span>
              <Link href="/hardware" className="hover:text-white transition-colors">
                Steam Deck OLED vs ROG Ally X: 6-Month Reliability Verdict
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-brand-muted shrink-0 text-[11px]">
          <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            142k Online
          </span>
          <span>|</span>
          <span className="uppercase text-slate-300">{currentDate}</span>
        </div>
      </div>
    </div>
  );
}
