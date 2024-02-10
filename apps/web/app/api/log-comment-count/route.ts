import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const logId = searchParams.get('logId');
  if (!logId) return NextResponse.json(null, { status: 404 });

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const comments = await pb
      .collection('comments')
      .getFirstListItem(`log="${logId}"`);

    const replyComments = await pb
      .collection('replyComments')
      .getFirstListItem(`log="${logId}"`);

    const commentCount = comments.comment.length + replyComments.comment.length;

    return NextResponse.json(commentCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
