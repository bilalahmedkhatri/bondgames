'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Gamepad, Newspaper, Cpu, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keydown handler for Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = [
    { label: '#GTA6', query: 'GTA VI', href: '/games/gta-vi' },
    { label: '#RTX5090', query: 'RTX 5090', href: '/news/nvidia-rtx-5090-specs-benchmark-leak' },
    { label: '#PS5Pro', query: 'PS5 Pro', href: '/news/gta-vi-leaks-ps5-pro-60fps' },
    { label: '#EldenRing', query: 'Elden Ring', href: '/games/elden-ring-shadow-of-the-erdtree' },
    { label: '#MonsterHunter', query: 'Monster Hunter', href: '/games/monster-hunter-wilds' },
    { label: '#Benchmarks', query: 'Benchmarks', href: '/compare' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/games?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all"
      onClick={(e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="bg-brand-surface border border-brand-border w-full max-w-2xl rounded-xl p-5 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-between border-b border-brand-border pb-3.5 gap-3">
          <div className="flex items-center gap-3 flex-1 text-white font-mono text-sm">
            <Search className="w-5 h-5 text-brand-red shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 5,000+ games, hardware, reviews (e.g. GTA VI, RTX 5090)..."
              className="bg-transparent border-none focus:outline-none w-full text-white font-mono text-xs sm:text-sm placeholder:text-brand-muted"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-brand-muted hover:text-white p-1 rounded hover:bg-brand-border transition-colors font-mono text-xs flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </form>

        {/* Quick Trending Tags */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider block">
            Instant Trending Searches:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {popularTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setQuery(tag.query);
                  onClose();
                  router.push(tag.href);
                }}
                className="bg-black/60 border border-brand-border hover:border-brand-red px-3 py-1.5 rounded text-brand-muted hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Section Shortcuts */}
        <div className="border-t border-brand-border/60 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          <Link
            href="/games"
            onClick={onClose}
            className="p-2.5 rounded bg-black/40 border border-brand-border hover:border-brand-red hover:bg-brand-surfaceHover transition-colors flex items-center justify-between group"
          >
            <span className="flex items-center gap-2 text-slate-300 group-hover:text-white">
              <Gamepad className="w-3.5 h-3.5 text-brand-red" />
              Catalogue
            </span>
            <ArrowRight className="w-3 h-3 text-brand-muted group-hover:text-white" />
          </Link>
          <Link
            href="/compare"
            onClick={onClose}
            className="p-2.5 rounded bg-black/40 border border-brand-border hover:border-brand-cyan hover:bg-brand-surfaceHover transition-colors flex items-center justify-between group"
          >
            <span className="flex items-center gap-2 text-slate-300 group-hover:text-white">
              <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
              Benchmarks
            </span>
            <ArrowRight className="w-3 h-3 text-brand-muted group-hover:text-white" />
          </Link>
          <Link
            href="/news"
            onClick={onClose}
            className="p-2.5 rounded bg-black/40 border border-brand-border hover:border-yellow-400 hover:bg-brand-surfaceHover transition-colors flex items-center justify-between group"
          >
            <span className="flex items-center gap-2 text-slate-300 group-hover:text-white">
              <Newspaper className="w-3.5 h-3.5 text-yellow-400" />
              News Feed
            </span>
            <ArrowRight className="w-3 h-3 text-brand-muted group-hover:text-white" />
          </Link>
        </div>

        {/* Footer Hint */}
        <div className="text-[11px] font-mono text-brand-muted text-right">
          Press <kbd className="bg-black/80 px-1 py-0.5 rounded text-white border border-brand-border">Enter</kbd> to search or <kbd className="bg-black/80 px-1 py-0.5 rounded text-white border border-brand-border">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
}
