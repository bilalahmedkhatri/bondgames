'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; href: string; highlight?: boolean }[] = [
    { label: 'Home', href: '/' },
    { label: 'Games', href: '/games' },
    { label: 'News Feed', href: '/news' },
    { label: 'Benchmarks & Compare', href: '/hardware' },
    { label: 'Advertise', href: '/advertise' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto lg:px-0 md:px-4 px-2">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0" aria-label="BondsGame Home">
              <Image
                src="/logo.webp"
                alt="BondsGame"
                width={68}
                height={43}
                priority
                className="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-heading text-lg sm:text-2xl font-black tracking-tighter text-white whitespace-nowrap">
                  BONDS<span className="text-brand-red">GAME</span>
                </span>
                <span className="text-[9px] sm:text-[11px] font-mono font-bold tracking-widest text-brand-cyan uppercase mt-[-1]">
                  .click
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold tracking-wider uppercase">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-md transition-all ${isActive
                      ? 'text-white bg-brand-surface border-b-2 border-brand-red font-extrabold'
                      : link.highlight
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-brand-surface'
                        : 'text-brand-muted hover:text-white hover:bg-brand-surface/60'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Command Palette Trigger (Hidden on mobile < sm, visible on tablet/desktop) */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 bg-brand-surface hover:bg-brand-surfaceHover text-brand-muted hover:text-white px-3 py-2 rounded-lg border border-brand-border text-xs font-mono transition-colors"
              title="Search games, hardware, and news (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-brand-red" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block bg-black/60 px-1.5 py-0.5 text-[10px] rounded border border-brand-border text-brand-muted font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-muted hover:text-white rounded-lg border border-brand-border bg-brand-surface"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-surface border-b border-brand-border px-5 py-4 space-y-3 font-semibold uppercase text-xs tracking-wider">
          {/* Mobile Search Trigger inside drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch?.();
            }}
            className="w-full flex items-center justify-between bg-brand-bg hover:bg-brand-surfaceHover text-brand-muted hover:text-white px-3.5 py-2.5 rounded-lg border border-brand-border text-xs font-mono transition-colors mb-2"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-red" />
              <span>Search games, news & tech...</span>
            </span>
            <kbd className="bg-black/60 px-1.5 py-0.5 text-[10px] rounded border border-brand-border text-brand-muted font-sans">
              ⌘K
            </kbd>
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-white border-b border-brand-border/40"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/creators"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-red hover:bg-brand-redDark text-white text-center py-2.5 rounded text-xs font-bold uppercase transition-colors"
            >
              Content Creators & Editorial Team
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-border hover:bg-brand-borderLight text-slate-300 text-center py-2 rounded text-xs font-semibold uppercase transition-colors"
            >
              My Dashboard & Bookmarks
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
