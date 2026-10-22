import { NextRequest, NextResponse } from 'next/server';
import { getPoll, recordVote } from '@/lib/db/poll';

export async function GET() {
  const poll = await getPoll();
  return NextResponse.json(poll);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { optionId } = body;
    if (!optionId) {
      return NextResponse.json({ error: 'optionId is required' }, { status: 400 });
    }
    const updatedPoll = await recordVote(optionId);
    return NextResponse.json(updatedPoll);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
