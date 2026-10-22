import { NextRequest, NextResponse } from 'next/server';
import { getCommentsByTarget, addComment } from '@/lib/db/comments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get('targetId');
  const targetType = (searchParams.get('targetType') as 'game' | 'article') || 'article';

  if (!targetId) {
    return NextResponse.json({ error: 'targetId query parameter is required' }, { status: 400 });
  }

  const comments = await getCommentsByTarget(targetId, targetType);
  const mapped = comments.map((c) => ({
    id: c.id,
    author: c.authorName,
    content: c.content,
    createdAt: c.createdAt,
    upvotes: c.upvotes,
    downvotes: c.downvotes,
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetId, targetType = 'article', author, authorName, content } = body;

    const name = (author || authorName || '').trim();
    if (!targetId || !content || !name) {
      return NextResponse.json(
        { error: 'targetId, author name, and content are required' },
        { status: 400 }
      );
    }

    const saved = await addComment(targetId, targetType, name, content);
    return NextResponse.json({
      id: saved.id,
      author: saved.authorName,
      content: saved.content,
      createdAt: saved.createdAt,
      upvotes: saved.upvotes,
      downvotes: saved.downvotes,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
