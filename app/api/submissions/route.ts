import { NextRequest, NextResponse } from 'next/server';
import { submitGuestPost, submitAdInquiry, submitContactMessage } from '@/lib/db/submissions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'guest_post') {
      const res = await submitGuestPost(data);
      return NextResponse.json({ success: true, submission: res });
    }

    if (type === 'ad_inquiry') {
      const res = await submitAdInquiry(data);
      return NextResponse.json({ success: true, inquiry: res });
    }

    if (type === 'contact') {
      const res = await submitContactMessage(data);
      return NextResponse.json({ success: true, message: res });
    }

    return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
