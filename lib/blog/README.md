# Reusable database blog

BondsGame's existing `/news` and `/news/[slug]` designs read English published posts from this application's PostgreSQL database. Homepage, hardware/deals article feeds and sitemap use the same reader. No admin API, central users table or authorized_apps lookup is used. Legacy `articles` data is not modified or imported. Existing games/polls/comments remain separate.

## Setup

1. Set one `DATABASE_URL` in `.env.local` or deployment secrets. Both the app and blog reader use this same database URL. Blog queries run in read-only transactions; the shared database role must still have any permissions needed by the app’s existing write features. `config.example.env` is the portable, trackable environment template. The root `.env.example` also contains placeholders only but is ignored by this repository's existing `.gitignore`.
2. Inspect the target database before setup. For a genuinely new database only, manually review and execute `schema.sql`. It defines the authoritative backend `blog_0003` tables, indexes and revision marker. Nothing imports or executes this SQL at runtime. Existing installations must use the backend's migration owner instead of re-running this file.
3. Set `BLOG_MEDIA_ORIGINS` to the exact HTTPS B2/CDN origins used by that app's assets and author snapshots. Restart after changes so Next Image and server rendering agree. No B2 secrets or uploads are needed. Other pre-existing images currently use images.unsplash.com.
4. Configure the separate admin's blog target to this same app database and the public base `https://www.bondsgame.click/news`.

On 29 October 2026 the newly configured database connected successfully with verified TLS. Inspection confirmed an empty application schema. The manual `blog_0003` SQL was then applied transactionally for the user's requested BondsGame acceptance test, with an empty-schema guard. The requested article, category and credited external Unsplash asset were created; final article status is published. The source photo is registered under an `external/unsplash/` object key, not uploaded to B2. `BLOG_MEDIA_ORIGINS` locally includes the existing media origin and `https://images.unsplash.com`; deployment must configure the same allowed origin or transfer the licensed image to its media host. Never disable certificate verification in production.

## Connection and freshness

The existing Neon helper speaks Neon HTTP and silently falls back to seeds, so it cannot serve this Supabase database reliably. `database.ts` uses the small `postgres` driver, read-only transactions, `prepare: false` on every connection, a 5-second connection timeout, 8-second statement timeout, 2-second lock timeout and bounded pool sizes. This avoids named prepared statement collisions with transaction poolers. TLS verifies the server certificate by default.

Queries call Next's `connection()`; detail uses React request-local cache only. There is no persistent post cache: the next request observes admin publication changes without an invalidation hook. Sitemap is also dynamic. Database/configuration failures throw a sanitized error and are never translated to empty results, seeded posts or a missing-post 404. A successful exact published lookup with no row produces `notFound()` before rendering the detail.

## Reuse

Copy `lib/blog` and install `postgres`. Change `config.ts` (origin, route base, locales, media origins), `database.ts` environment/connection wiring, and `adapter.ts`/`seo.ts` to match the target app's existing view model and metadata helpers. Queries, document validation and URL safety are independent of UI. The renderer's classes are the BondsGame UI skin; adapt those tokens if necessary.

Listing queries are parameterized, joined, bounded to 48 rows (12 by default), and ordered by published_at DESC then id DESC. Category URLs use stored category slugs. The sitemap fails explicitly beyond 45,000 posts until pagination is implemented. Only `en` is enabled; no translations or hreflang are invented.

Content supports v1 standard image/audio/youtube, legacy custom media, tables and basic Tiptap nodes/marks. Documents are bounded to 1 MiB, 8,000 nodes and depth 24. Unknown/invalid documents show a controlled content message. Images/audio/video/files resolve against app-local assets in a batch; arbitrary src and iframe values are never rendered. YouTube has exact host/video ID validation. No article HTML injection is used; JSON-LD uses the existing escaping helper. Stored canonical URLs are accepted only for the exact app post URL, and structured data is rebuilt from published fields rather than trusting stored script data.

Acceptance evidence is in `output/ai-gaming-workflows/live-test-report.json`: production build, TypeScript, SEO tests, draft/publish/archive/republication, HTTP routes, canonical metadata, sitemap and desktop/mobile image rendering passed. Clearing stale `.next` cache resolved an initial Turbopack CSS worker crash. Publication transitions were executed by the explicit test helper, not through the separate admin UI. No deployment was performed. The separate comments table is still missing: the legacy comments API acknowledged a temporary test comment but lost it on restart, and voting remains client-only. Unrelated games/polls/bookmarks still use seed fallbacks; hardcoded ticker links can point to missing legacy news. Do not interpret blog-reader acceptance as acceptance of those features.
