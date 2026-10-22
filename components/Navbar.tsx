'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, PenTool, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Games', href: '/games' },
    { label: 'News Feed', href: '/news' },
    { label: 'Benchmarks & Compare', href: '/compare' },
    { label: 'Guest Post', href: '/guest-post', highlight: true },
    { label: 'Advertise', href: '/advertise' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-brand-red flex items-center justify-center font-black text-white text-xl font-heading rounded-md shadow-lg shadow-rose-950/40 group-hover:bg-white group-hover:text-black transition-all">
                G
              </div>
              <span className="font-heading text-2xl font-black tracking-tighter text-white">
                GAMER<span className="text-brand-red">GRID</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold tracking-wider uppercase">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-md transition-all ${
                      isActive
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
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-brand-surface hover:bg-brand-surfaceHover text-brand-muted hover:text-white px-3 py-2 rounded-lg border border-brand-border text-xs font-mono transition-colors"
              title="Search games, hardware, and news (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-brand-red" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block bg-black/60 px-1.5 py-0.5 text-[10px] rounded border border-brand-border text-brand-muted font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Write for Us Button */}
            <Link
              href="/guest-post"
              className="hidden sm:inline-flex items-center gap-1.5 bg-brand-surface hover:bg-brand-border text-yellow-400 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border border-brand-border transition-colors"
            >
              <PenTool className="w-3.5 h-3.5 text-brand-red" />
              <span>Write for Us</span>
            </Link>

            {/* Dashboard / Profile */}
            <Link
              href="/dashboard"
              className="bg-brand-surface hover:bg-brand-surfaceHover text-brand-text p-2.5 rounded-lg border border-brand-border transition-colors flex items-center justify-center"
              title="User Dashboard & Wishlist"
            >
              <User className="w-4 h-4 text-brand-muted hover:text-brand-red" />
            </Link>

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
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-border hover:bg-brand-borderLight text-white text-center py-2.5 rounded text-xs font-bold uppercase"
            >
              My Dashboard & Bookmarks
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
