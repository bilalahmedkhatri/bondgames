import { runNeonQuery } from './neon';
import { getGames } from './games';
import { getArticles } from './articles';
import { Game, Article, Comment } from '../types';

let userBookmarksStore: { itemType: 'game' | 'article'; slug: string }[] = [
  { itemType: 'game', slug: 'gta-vi' },
  { itemType: 'game', slug: 'elden-ring-shadow-of-the-erdtree' },
  { itemType: 'article', slug: 'gta-vi-leaks-ps5-pro-60fps' }
];

export async function getUserBookmarks(): Promise<{ games: Game[]; articles: Article[] }> {
  const neonResults = await runNeonQuery<any>(
    'SELECT item_type, item_slug FROM bookmarks WHERE user_id = $1',
    ['default-user']
  );

  const bookmarks = neonResults && neonResults.length > 0
    ? neonResults.map(r => ({ itemType: r.item_type, slug: r.item_slug }))
    : userBookmarksStore;

  const allGames = await getGames();
  const allArticles = await getArticles();

  const games = allGames.filter(g => bookmarks.some(b => b.itemType === 'game' && b.slug === g.slug));
  const articles = allArticles.filter(a => bookmarks.some(b => b.itemType === 'article' && b.slug === a.slug));

  return { games, articles };
}

export async function toggleBookmark(slug: string, itemType: 'game' | 'article'): Promise<boolean> {
  const existingIdx = userBookmarksStore.findIndex(b => b.slug === slug && b.itemType === itemType);

  if (existingIdx >= 0) {
    userBookmarksStore.splice(existingIdx, 1);
    await runNeonQuery(
      'DELETE FROM bookmarks WHERE user_id = $1 AND item_slug = $2 AND item_type = $3',
      ['default-user', slug, itemType]
    );
    return false; // Removed
  } else {
    userBookmarksStore.push({ slug, itemType });
    await runNeonQuery(
      `INSERT INTO bookmarks (user_id, item_type, item_slug)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, item_type, item_slug) DO NOTHING`,
      ['default-user', itemType, slug]
    );
    return true; // Added
  }
}

export function isItemBookmarked(slug: string, itemType: 'game' | 'article'): boolean {
  return userBookmarksStore.some(b => b.slug === slug && b.itemType === itemType);
}

export async function getUserActivityComments(): Promise<Comment[]> {
  return [
    {
      id: 'uc-1',
      targetId: 'art-1',
      targetType: 'article',
      authorName: 'Alex Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      content: 'Can not wait to see the ray-traced water reflections in the Vice City marina at night!',
      createdAt: 'Oct 22, 2026',
      upvotes: 45,
      downvotes: 1
    },
    {
      id: 'uc-2',
      targetId: 'art-3',
      targetType: 'article',
      authorName: 'Alex Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      content: 'Upgrading from my 3080 once this drops. 32GB VRAM is future proof for Unreal 5.5 Nanite meshes.',
      createdAt: 'Oct 21, 2026',
      upvotes: 19,
      downvotes: 0
    }
  ];
}
