<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BondsGame — Engineering & Agent Architecture Guide

Welcome to **BondsGame**, a high-performance, dynamic gaming news, review, and hardware benchmark web portal inspired by IGN, GameSpot, and Polygon. This document serves as the canonical guide for AI agents, pair programmers, and human contributors working within this repository.

---

## 1. System-Wide Architecture & Technology Stack

* **Framework**: Next.js 16+ (App Router with Turbopack)
* **Runtime / Core**: React 19.3+, TypeScript 5
* **Styling**: Tailwind CSS v4 using modern `@theme` design tokens
* **Icons**: `lucide-react`
* **Typography**:
  * Headings: `Syne` (Punchy, bold editorial display)
  * Body & UI: `Inter` (Clean, legible sans-serif)
  * Numbers & Metrics: Standard Monospace
* **Database & Persistence**:
  * Neon Serverless Postgres (`@neondatabase/serverless`)
  * Dynamic fallback to in-memory seed data stores if `DATABASE_URL` is unconfigured

---

## 2. Design System & Theme Tokens

All color and typography tokens are defined in `app/globals.css` under `@theme`:

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--color-brand-bg` | `#0b0e14` | Primary deep black/slate background |
| `--color-brand-surface` | `#121824` | Card, container, and dialog background |
| `--color-brand-card` | `#121824` | Alias for component card background |
| `--color-brand-surfaceHover`| `#1c2230` | Interactive card and button hover state |
| `--color-brand-border` | `#232936` | Subtle dividers and component borders |
| `--color-brand-border-light`| `#323b4e` | Elevated borders and input focus rings |
| `--color-brand-red` | `#e63946` | Primary editorial accent (scores, breaking news) |
| `--color-brand-redDark` | `#c1121f` | Dark crimson for button active states |
| `--color-brand-cyan` | `#06b6d4` | Secondary accent (hardware, tech, links) |
| `--color-brand-purple` | `#8b5cf6` | Genre badges and RPG highlights |
| `--color-brand-amber` | `#f59e0b` | Warnings, reading times, and deal tags |
| `--color-brand-muted` | `#8b95a5` | Muted metadata and subtitle typography |
| `--color-brand-text` | `#f1f5f9` | High-contrast body text |

---

## 3. Directory & File Structure

```
d:/bondgame/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root HTML shell with font configuration & ClientShell
│   ├── globals.css             # Tailwind v4 theme definitions and utilities
│   ├── page.tsx                # Homepage (Hero, Trending, Reviews, Benchmarks)
│   ├── news/
│   │   ├── page.tsx            # News Hub with category filter tabs
│   │   └── [slug]/page.tsx     # Single article view with markdown body & comments
│   ├── games/
│   │   ├── page.tsx            # Game catalogue with search & multi-facet filtering
│   │   └── [slug]/page.tsx     # Game review detail with VerdictCard & SpecsTable
│   ├── hardware/
│   │   └── page.tsx            # Hardware lab, GPU showdown & FPS benchmark charts
│   ├── deals/
│   │   └── page.tsx            # Curated price drops, freebies & discount badges
│   ├── community/
│   │   └── page.tsx            # Interactive poll, forum debates & Discord count
│   ├── submit-post/
│   │   └── page.tsx            # Guest post pitch & editorial tiers ($30/$50/Custom)
│   ├── advertise/
│   │   └── page.tsx            # Media kit, demographic metrics & ad inquiry form
│   ├── contact/
│   │   └── page.tsx            # Editorial staff roster & department dispatch form
│   ├── dashboard/
│   │   └── page.tsx            # User profile, tracked games watchlist & comments
│   ├── compare/page.tsx        # Redirects to /hardware
│   ├── guest-post/page.tsx      # Redirects to /submit-post
│   ├── terms/page.tsx          # Terms of service & editorial independence policy
│   ├── privacy-policy/page.tsx # Privacy disclosures & cookie transparency
│   └── api/
│       ├── comments/route.ts   # GET & POST comments per target
│       ├── polls/route.ts      # GET poll data & POST vote recording
│       └── submissions/route.ts# POST guest posts, ad inquiries, contact messages
│
├── components/                 # Reusable React components
│   ├── ui/                     # Micro atomic & molecular UI elements
│   │   ├── AuthorByline.tsx    # Reusable author row with avatar, role, date, time
│   │   ├── Badge.tsx           # Versatile badge with multiple color themes
│   │   ├── Breadcrumbs.tsx     # Breadcrumb trail with home icon and hierarchy
│   │   ├── Button.tsx          # Styled buttons with loading spinners & icons
│   │   ├── Card.tsx            # Flexible card primitives
│   │   ├── CategoryBadge.tsx   # Color-coded genre and category pills
│   │   ├── EmptyState.tsx      # Fallback state when search/filter returns 0 items
│   │   ├── Input.tsx           # Text fields and Textarea with brand borders
│   │   ├── PlatformIcon.tsx    # PC, PS5, Xbox, Switch badges and lists
│   │   ├── ProsConsBox.tsx     # Green pros / red cons breakdown with icons
│   │   ├── ScoreBadge.tsx      # Circular or pill score indicator (0-10)
│   │   ├── SectionHeader.tsx   # Section title bar with accent border & "View All"
│   │   ├── ShareButtons.tsx    # Social sharing (X, Reddit, Copy Link with toast)
│   │   ├── Skeleton.tsx        # Loading placeholder skeletons
│   │   ├── SpecsTable.tsx      # System requirements table (Min vs Recommended)
│   │   ├── StarRating.tsx      # Interactive 5-star rating widget
│   │   ├── StatCounter.tsx     # View, comment, and upvote counters with icons
│   │   └── TrendingBadge.tsx   # Pulsing flame trending indicator
│   │
│   ├── ArticleCard.tsx         # Article cards (variants: feature, list, mini)
│   ├── BenchmarkChart.tsx      # Pure CSS animated horizontal FPS benchmark bars
│   ├── ClientShell.tsx         # Client layout wrapper (Ticker, Navbar, PlatformBar)
│   ├── CommentSection.tsx      # Interactive comment thread with voting & submission
│   ├── CommunityPoll.tsx       # Real-time animated voting poll widget
│   ├── FilterBar.tsx           # Genre, platform, and sort dropdown bar
│   ├── Footer.tsx              # Comprehensive footer with newsletter & legal links
│   ├── GameCard.tsx            # Game cards (variants: default, horizontal, hero)
│   ├── HeroLeadArticle.tsx     # Asymmetric lead story banner with breaking tag
│   ├── Navbar.tsx              # Sticky header with logo, navigation & search trigger
│   ├── NewsletterBanner.tsx    # Full-width newsletter subscription callout
│   ├── Pagination.tsx          # Reusable page navigation numbers
│   ├── PlatformBar.tsx         # Quick platform filter links bar
│   ├── SearchModal.tsx         # Fullscreen search command palette (⌘K)
│   ├── Sidebar.tsx             # Composed right sidebar (trending games, polls, news)
│   ├── TopTicker.tsx           # Animated breaking news ticker with live date
│   ├── TrendingGamesRail.tsx   # Ranked (#1, #2, #3) horizontal game shelf
│   └── VerdictCard.tsx         # Editorial review verdict box with quote & buy links
│
└── lib/
    ├── types.ts                # Canonical TypeScript models and interfaces
    └── db/                     # Data access & database abstraction
        ├── neon.ts             # Neon Serverless Postgres client connection
        ├── schema.sql          # Postgres SQL tables and relational constraints
        ├── seed-data.ts        # Market-trending games & news with human touch
        ├── games.ts            # Game queries, filtering, and slug lookups
        ├── articles.ts         # Article queries, categories, and view increments
        ├── comments.ts         # Comment retrieval, insertion, and upvoting
        ├── poll.ts             # Community poll retrieval and vote recording
        ├── dashboard.ts        # User bookmarks, watchlist, and activity log
        └── submissions.ts      # Guest post pitches, ad inquiries, and contact
```

---

## 4. Data Layer & Market-Trending Seed Data

The application includes rich, authentic gaming journalism data in `lib/db/seed-data.ts` crafted with a realistic **human touch**:

* **Top Trending Games Tracked**:
  * *Black Myth: Wukong* (Game Science | Score: 9.3) — UE5, staff stances, 80+ bosses.
  * *Astro Bot* (Team ASOBI / Sony | Score: 9.7) — Platforming joy, DualSense haptics.
  * *Grand Theft Auto VI* (Rockstar Games | Score: 9.9) — Vice City, PSSR AI 60FPS.
  * *Elden Ring: Shadow of the Erdtree* (FromSoftware | Score: 9.8) — Land of Shadow, Messmer.
  * *Warhammer 40,000: Space Marine 2* (Saber Interactive | Score: 8.9) — Swarm Engine.
  * *Helldivers 2* (Arrowhead / Sony | Score: 9.1) — Co-op emergent war, Battle for Tarsh.
  * *Metaphor: ReFantazio* (Studio Zero / Atlus | Score: 9.4) — 40+ Archetype RPG.
  * *Monster Hunter Wilds* (Capcom | Score: 9.5) — Living biomes, Focus Mode.
  * *Silent Hill 2 Remake* (Bloober Team | Score: 9.0) — Fog, psychological terror.
  * *Final Fantasy VII Rebirth* (Square Enix | Score: 9.3) — Queen's Blood, synergy combat.
  * *Dragon's Dogma 2* (Capcom | Score: 8.9) — Emergent Pawn physics.
  * *S.T.A.L.K.E.R. 2: Heart of Chornobyl* (GSC Game World | Score: 8.6) — UE5 Nanite survival.
  * *Cyberpunk 2077: Phantom Liberty* (CDPR | Score: 9.5) — Dogtown, Path Tracing.

* **Hardware Showdown Data**:
  * Leaked engineering specifications for the **GeForce RTX 5090 vs RTX 4090** (Blackwell GB202, 32GB GDDR7, 512-bit bus, 1,792 GB/s bandwidth).
  * Real-world in-game FPS benchmarks tracked across 4K Ultra and 1440p High.

---

## 5. Development & Best Practices for AI Agents

When implementing features or refactoring code in this repository:

1. **Component-Based Modularity**:
   * Do not write monolithic inline JSX. Always extract reusable UI elements into `components/ui/` or composite components into `components/`.
   * Keep components pure, reusable, and typed with TypeScript interfaces from `lib/types.ts`.
2. **Next.js 16 Prerendering Rules**:
   * Do not evaluate dynamic dates (e.g. `new Date()`) directly in the JSX render body of Client Components; either defer via `useEffect()` or use a static constant to avoid blocking prerender builds.
   * `cacheComponents` and Partial Prefetching are managed without conflicting segment configs (`export const revalidate`).
3. **Responsive Design**:
   * Mobile-first design using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
   * Ensure horizontal overflow is guarded with `.no-scrollbar` or `overflow-x-auto`.
4. **Build Verification**:
   * Always verify that `npx tsc --noEmit` and `npm run build` pass with zero errors before concluding any significant task.
