import React from 'react';
import { pageMetadata } from '@/lib/seo';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CommunityPoll } from '@/components/CommunityPoll';
import { getPoll } from '@/lib/db/poll';
import { getGames } from '@/lib/db/games';
import { Users, MessageSquare, ThumbsUp, Flame, ExternalLink } from 'lucide-react';

export const metadata = pageMetadata({"title":"Gaming Community & Polls","description":"Join gaming discussions, explore community debates and vote in the GamerGrid gaming poll.","path":"/community"});

export default async function CommunityPage() {
  const [poll, games] = await Promise.all([getPoll(), getGames()]);

  const activeDebates = [
    {
      id: 'deb-1',
      title: 'Should Rockstar prioritize 60FPS or Path Tracing on standard PS5 and Xbox Series X?',
      author: 'ConsoleEnthusiast',
      commentsCount: 384,
      category: 'Technical Debate',
      tag: 'GTA VI',
    },
    {
      id: 'deb-2',
      title: 'Is Astro Bot the best 3D platformer since Super Mario Odyssey? Let\'s debate mechanics.',
      author: 'PlatformerFanatic',
      commentsCount: 295,
      category: 'GOTY Discussion',
      tag: 'Astro Bot',
    },
    {
      id: 'deb-3',
      title: 'Black Myth: Wukong staff stance tier list: Why Smash Stance dominates early chapters.',
      author: 'DestinedOne99',
      commentsCount: 218,
      category: 'Builds & Strategy',
      tag: 'Black Myth',
    },
    {
      id: 'deb-4',
      title: 'Helldivers 2 Super Earth Galactic War update: Defensive tactics for the Automaton front.',
      author: 'DemocracyOfficer',
      commentsCount: 167,
      category: 'War Strategy',
      tag: 'Helldivers 2',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'Community Hub & Polls' }]} />

      {/* Header */}
      <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-purple flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> GamerGrid Community Lounge
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Community Polls, Debates & Discord Dispatch
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl">
            Cast your vote in weekly editorial polls, voice your perspectives on gaming controversies, and debate with verified players.
          </p>
        </div>

        {/* Discord join badge */}
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all text-xs font-mono font-bold shrink-0"
        >
          <span>Join Official Discord (142k)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Top Grid: Live Poll + Active Debates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (5 cols): Live Featured Community Poll */}
        <div className="lg:col-span-5 space-y-4">
          <SectionHeader title="Featured Poll" accent="red" />
          <CommunityPoll
            pollId={poll.id || 'community-poll'}
            question={poll.question}
            options={poll.options}
            totalVotes={poll.totalVotes}
          />
        </div>

        {/* Right (7 cols): Active Community Debates */}
        <div className="lg:col-span-7 space-y-4">
          <SectionHeader title="Hot Forum Debates" accent="cyan" />
          <div className="space-y-3">
            {activeDebates.map((debate) => (
              <div
                key={debate.id}
                className="p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-cyan/50 hover:bg-brand-surfaceHover transition-all space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-brand-purple font-bold uppercase">
                    [{debate.category}]
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/40 text-brand-cyan border border-brand-cyan/30 text-[10px]">
                    {debate.tag}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-white group-hover:text-brand-cyan transition-colors leading-snug">
                  {debate.title}
                </h3>
                <div className="flex items-center justify-between pt-1 text-xs text-brand-muted font-mono">
                  <span>Started by {debate.author}</span>
                  <span className="flex items-center gap-1 text-brand-cyan">
                    <MessageSquare className="w-3.5 h-3.5" /> {debate.commentsCount} replies
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
