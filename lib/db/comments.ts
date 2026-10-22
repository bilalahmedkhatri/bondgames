import type { Comment } from '../types';
import { runNeonQuery } from './neon';

let commentsStore: Comment[] = [
  {
    id: 'c-1',
    targetId: 'art-1',
    targetType: 'article',
    authorName: 'PixelKnight',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    content: 'If GTA VI actually manages a rock-solid 60fps with PSSR on PS5 Pro, it is going to sell millions of upgrade consoles overnight. Rockstar physics are notoriously CPU heavy though, so fingers crossed the Zen 2 clock boost holds up.',
    createdAt: 'Oct 22, 2026',
    upvotes: 412,
    downvotes: 12,
  },
  {
    id: 'c-2',
    targetId: 'art-1',
    targetType: 'article',
    authorName: 'SynthWave88',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    content: 'PSSR looks impressive in Spider-Man 2 and Rebirth, but a fully dynamic simulation like GTA with thousands of reactive pedestrians, volumetric weather, and traffic AI is the ultimate crucible.',
    createdAt: 'Oct 22, 2026',
    upvotes: 289,
    downvotes: 8,
  },
  {
    id: 'c-3',
    targetId: 'art-2',
    targetType: 'article',
    authorName: 'WukongMaster',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    content: '20 million copies without a single microtransaction or battle pass! Hopefully Western publishers take notes: make a complete, polished, beautiful game and gamers will gladly pay full price on day one.',
    createdAt: 'Oct 22, 2026',
    upvotes: 541,
    downvotes: 9,
  },
  {
    id: 'c-4',
    targetId: 'game-1',
    targetType: 'game',
    authorName: 'SunWukongFan',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    content: 'Chapter 3 and Chapter 4 blew my mind. The boss fights with Yellow Wind Sage and Hundred-Eyed Daoist Master had me clenching my teeth for hours. Thrust stance is severely underrated for breaking posture!',
    createdAt: 'Oct 21, 2026',
    upvotes: 312,
    downvotes: 6,
  },
  {
    id: 'c-5',
    targetId: 'game-2',
    targetType: 'game',
    authorName: 'RetroGamer99',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    content: 'The level where you turn into a sponge and soak up water to put out flames made me giggle like I was 8 years old playing Mario 64. Team ASOBI saved 2024 for me. Pure unadulterated joy.',
    createdAt: 'Oct 21, 2026',
    upvotes: 420,
    downvotes: 4,
  },
  {
    id: 'c-6',
    targetId: 'game-3',
    targetType: 'game',
    authorName: 'TarnishedElden',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    content: 'Messmer the Impaler is easily top 3 FromSoft bosses of all time. The phase transition music gave me chills. Make sure you collect Scadutree fragments early though — going into Belurat at blessing level 1 was pure suicide haha.',
    createdAt: 'Oct 20, 2026',
    upvotes: 278,
    downvotes: 11,
  },
  {
    id: 'c-7',
    targetId: 'art-3',
    targetType: 'article',
    authorName: 'HardwareHacker',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    content: 'A 512-bit bus with 32GB GDDR7 is an absolute monster. The memory bandwidth alone will eliminate all VRAM bottlenecks in 4K path tracing. Better start saving for a 1200W ATX 3.1 power supply though.',
    createdAt: 'Oct 22, 2026',
    upvotes: 184,
    downvotes: 5,
  },
];

export async function getCommentsByTarget(targetId: string, targetType: 'game' | 'article'): Promise<Comment[]> {
  const neonResults = await runNeonQuery<any>(
    'SELECT * FROM comments WHERE target_id = $1 AND target_type = $2 ORDER BY created_at DESC',
    [targetId, targetType]
  );

  if (neonResults && neonResults.length > 0) {
    return neonResults.map((r) => ({
      id: r.id,
      targetId: r.target_id,
      targetType: r.target_type,
      authorName: r.author_name,
      authorAvatar: r.author_avatar,
      content: r.content,
      upvotes: r.upvotes,
      downvotes: r.downvotes,
      createdAt: r.created_at,
    }));
  }

  return commentsStore.filter((c) => c.targetId === targetId && c.targetType === targetType);
}

export async function addComment(
  targetId: string,
  targetType: 'game' | 'article',
  authorName: string,
  content: string,
  authorAvatar = ''
): Promise<Comment> {
  const newComment: Comment = {
    id: 'c-' + Date.now(),
    targetId,
    targetType,
    authorName: authorName.trim() || 'Anonymous Gamer',
    authorAvatar,
    content: content.trim(),
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    upvotes: 1,
    downvotes: 0,
  };

  await runNeonQuery(
    `INSERT INTO comments (id, target_id, target_type, author_name, author_avatar, content, upvotes, downvotes, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [newComment.id, newComment.targetId, newComment.targetType, newComment.authorName, newComment.authorAvatar, newComment.content, newComment.upvotes, newComment.downvotes, newComment.createdAt]
  );

  commentsStore.unshift(newComment);
  return newComment;
}

export async function voteComment(commentId: string, type: 'up' | 'down'): Promise<Comment | null> {
  const col = type === 'up' ? 'upvotes' : 'downvotes';
  await runNeonQuery(`UPDATE comments SET ${col} = ${col} + 1 WHERE id = $1`, [commentId]);

  const comment = commentsStore.find((c) => c.id === commentId);
  if (comment) {
    if (type === 'up') comment.upvotes += 1;
    else comment.downvotes += 1;
    return comment;
  }
  return null;
}
