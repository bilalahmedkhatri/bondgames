import React from 'react';
import { pageMetadata } from '@/lib/seo';

import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/db/articles';
import { Tag, ExternalLink, Percent, Clock, Sparkles } from 'lucide-react';

export const metadata = pageMetadata({"title":"Gaming Deals & Store Offers","description":"Browse featured PC and console game deals and follow store links to check current prices, availability and offers.","path":"/deals"});

interface DealItem {
  id: string;
  title: string;
  store: 'Steam' | 'Epic Games' | 'PlayStation' | 'Xbox' | 'GOG';
  originalPrice: string;
  discountPrice: string;
  discountPercent: number;
  image: string;
  url: string;
  expiry: string;
  genre: string;
}

const DEALS_LIST: DealItem[] = [
  {
    id: 'd-1',
    title: 'Cyberpunk 2077: Ultimate Edition',
    store: 'Steam',
    originalPrice: '$79.99',
    discountPrice: '$43.99',
    discountPercent: 45,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    url: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    expiry: 'Ends Sunday',
    genre: 'Action RPG',
  },
  {
    id: 'd-2',
    title: 'Disco Elysium - The Final Cut',
    store: 'Steam',
    originalPrice: '$39.99',
    discountPrice: '$9.99',
    discountPercent: 75,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    url: 'https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/',
    expiry: 'Ends in 48 hours',
    genre: 'Narrative RPG',
  },
  {
    id: 'd-3',
    title: 'Hollow Knight: Voidheart Edition',
    store: 'PlayStation',
    originalPrice: '$14.99',
    discountPrice: '$7.49',
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    url: 'https://store.playstation.com',
    expiry: 'Weekly Sale',
    genre: 'Metroidvania',
  },
  {
    id: 'd-4',
    title: 'Doom Eternal Deluxe Edition',
    store: 'Xbox',
    originalPrice: '$69.99',
    discountPrice: '$17.49',
    discountPercent: 75,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    url: 'https://www.xbox.com',
    expiry: 'Ends Tuesday',
    genre: 'FPS Action',
  },
  {
    id: 'd-5',
    title: 'Death Stranding Director\'s Cut',
    store: 'Epic Games',
    originalPrice: '$39.99',
    discountPrice: 'FREE',
    discountPercent: 100,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    url: 'https://store.epicgames.com',
    expiry: 'Weekly Mystery Vault',
    genre: 'Action Adventure',
  },
  {
    id: 'd-6',
    title: 'Hades',
    store: 'Steam',
    originalPrice: '$24.99',
    discountPrice: '$8.49',
    discountPercent: 66,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    url: 'https://store.steampowered.com/app/1145360/Hades/',
    expiry: 'Ends in 3 days',
    genre: 'Action Roguelike',
  },
];

export default async function DealsPage() {
  const dealArticles = await getArticles({ category: 'Deals' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'Gaming Deals & Loot Drops' }]} />

      {/* Header */}
      <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" /> Curated Price Drops & Freebies
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Gaming Deals, Bundles & Digital Sales
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl">
            Verified lowest historical digital prices across Steam, Epic Games, PlayStation Network, and Xbox.
          </p>
        </div>
      </div>

      {/* Featured Deals Grid */}
      <section className="space-y-6">
        <SectionHeader
          title="Top Digital Loot Deals"
          subtitle="Hand-picked bargains with minimum 40% discount or free claimable titles."
          accent="red"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS_LIST.map((deal) => (
            <div
              key={deal.id}
              className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-emerald-500/60 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image + Discount Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                  
                  {/* Percent badge */}
                  <div className="absolute top-3 right-3 bg-emerald-500 text-black font-black text-xs px-2.5 py-1 rounded font-mono shadow-lg">
                    -{deal.discountPercent}%
                  </div>

                  {/* Store pill */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-white/10 uppercase">
                    {deal.store}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-mono text-brand-muted">
                    {deal.genre}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {deal.title}
                  </h3>
                  
                  {/* Price display */}
                  <div className="flex items-baseline gap-2 pt-1 font-mono">
                    <span className="text-xl font-black text-white">
                      {deal.discountPrice}
                    </span>
                    {deal.discountPrice !== 'FREE' && (
                      <span className="text-xs line-through text-brand-muted">
                        {deal.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-brand-border/60 text-xs font-mono">
                <span className="text-brand-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-amber" /> {deal.expiry}
                </span>
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black font-bold transition-all"
                >
                  Get Deal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals News and Buying Guides */}
      {dealArticles.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-brand-border">
          <SectionHeader
            title="Deals Guides & Freebies Dispatches"
            subtitle="Editor-curated guides on what to play next without breaking the bank."
            accent="cyan"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="feature" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
