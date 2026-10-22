'use client';

import React, { useState } from 'react';
import { TopTicker } from '@/components/TopTicker';
import { Navbar } from '@/components/Navbar';
import { PlatformBar } from '@/components/PlatformBar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <TopTicker />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <PlatformBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
