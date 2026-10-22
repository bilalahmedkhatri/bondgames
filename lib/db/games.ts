import { Game } from '../types';
import { INITIAL_GAMES } from './seed-data';
import { runNeonQuery } from './neon';

// In-memory store fallback
let gamesStore: Game[] = [...INITIAL_GAMES];

export interface GameFilterOptions {
  genre?: string;
  platform?: string;
  status?: string;
  minRating?: number;
  sort?: 'popular' | 'rating' | 'newest' | string;
  query?: string;
}

/**
 * Get all games with optional filtering and sorting
 */
export async function getGames(options: GameFilterOptions = {}): Promise<Game[]> {
  // If Neon is configured, attempt query
  const neonResults = await runNeonQuery<any>(`
    SELECT * FROM games ORDER BY rating DESC
  `);

  let list = neonResults && neonResults.length > 0
    ? neonResults.map(r => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        excerpt: r.excerpt,
        coverImage: r.cover_image,
        heroImage: r.hero_image,
        genres: r.genres || [],
        platforms: r.platforms || [],
        releaseDate: r.release_date,
        releaseStatus: r.release_status,
        developer: r.developer,
        publisher: r.publisher,
        score: Number(r.score || r.rating),
        rating: Number(r.rating),
        description: r.description || r.excerpt || '',
        trending: r.trending || false,
        metacriticScore: r.metacritic_score,
        verdict: r.verdict,
        specs: r.specs,
        purchaseLinks: r.purchase_links,
        isFeatured: r.is_featured
      } as Game))
    : [...gamesStore];

  // Filtering
  if (options.genre && options.genre !== 'all') {
    const gLower = options.genre.toLowerCase();
    list = list.filter(g => g.genres.some(genre => genre.toLowerCase().includes(gLower)));
  }

  if (options.platform && options.platform !== 'all') {
    const pLower = options.platform.toLowerCase();
    list = list.filter(g => g.platforms.some(plat => plat.toLowerCase().includes(pLower)));
  }

  if (options.status && options.status !== 'all') {
    list = list.filter(g => g.releaseStatus.toLowerCase() === options.status?.toLowerCase());
  }

  if (typeof options.minRating === 'number') {
    list = list.filter(g => g.rating >= options.minRating!);
  }

  if (options.query && options.query.trim().length > 0) {
    const qLower = options.query.toLowerCase().trim();
    list = list.filter(g => 
      g.title.toLowerCase().includes(qLower) ||
      g.excerpt.toLowerCase().includes(qLower) ||
      g.developer.toLowerCase().includes(qLower) ||
      g.genres.some(gen => gen.toLowerCase().includes(qLower))
    );
  }

  // Sorting
  if (options.sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (options.sort === 'newest') {
    list.sort((a, b) => (b.releaseDate > a.releaseDate ? 1 : -1));
  } else {
    // Default 'popular'
    list.sort((a, b) => (b.metacriticScore || 0) - (a.metacriticScore || 0));
  }

  return list;
}

/**
 * Get a single game by its unique slug
 */
export async function getGameBySlug(slug: string): Promise<Game | null> {
  const neonResult = await runNeonQuery<any>(
    'SELECT * FROM games WHERE slug = $1 LIMIT 1',
    [slug]
  );

  if (neonResult && neonResult.length > 0) {
    const r = neonResult[0];
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle,
      description: r.description || r.excerpt || '',
      excerpt: r.excerpt,
      coverImage: r.cover_image,
      heroImage: r.hero_image,
      genres: r.genres || [],
      platforms: r.platforms || [],
      releaseDate: r.release_date,
      releaseStatus: r.release_status,
      developer: r.developer,
      publisher: r.publisher,
      score: Number(r.score || r.rating),
      rating: Number(r.rating),
      metacriticScore: r.metacritic_score,
      trending: r.trending || false,
      verdict: r.verdict,
      specs: r.specs,
      purchaseLinks: r.purchase_links,
      isFeatured: r.is_featured
    };
  }

  const found = gamesStore.find(g => g.slug === slug);
  return found || null;
}

/**
 * Get featured games for spotlight sections
 */
export async function getFeaturedGames(): Promise<Game[]> {
  const games = await getGames();
  return games.filter(g => g.isFeatured || g.rating >= 9.0);
}

/**
 * Get top rated games
 */
export async function getTopRatedGames(limit = 6): Promise<Game[]> {
  const games = await getGames({ sort: 'rating' });
  return games.slice(0, limit);
}

/**
 * Create or insert a new game (CRUD Create)
 */
export async function createGame(game: Game): Promise<Game> {
  await runNeonQuery(
    `INSERT INTO games (id, slug, title, subtitle, excerpt, cover_image, hero_image, genres, platforms, release_date, release_status, developer, publisher, rating, metacritic_score, verdict, specs, purchase_links, is_featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
     ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, rating = EXCLUDED.rating`,
    [
      game.id,
      game.slug,
      game.title,
      game.subtitle,
      game.excerpt,
      game.coverImage,
      game.heroImage,
      game.genres,
      game.platforms,
      game.releaseDate,
      game.releaseStatus,
      game.developer,
      game.publisher,
      game.rating,
      game.metacriticScore,
      JSON.stringify(game.verdict),
      JSON.stringify(game.specs),
      JSON.stringify(game.purchaseLinks),
      game.isFeatured || false
    ]
  );

  const idx = gamesStore.findIndex(g => g.slug === game.slug);
  if (idx >= 0) {
    gamesStore[idx] = game;
  } else {
    gamesStore.unshift(game);
  }

  return game;
}
