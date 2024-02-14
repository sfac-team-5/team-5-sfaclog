import { ReplyCommentType } from '@/(route)/log/[id]/(components)/CommentSection/LogComment';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();
  const searchParams = request.nextUrl.searchParams;
  const commentId = searchParams.get('comment-id');
  const { text, publicScope } = await request.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const replyComments = await pb
      .collection('replyComments')
      .getFirstListItem(`log="${id}"`);

    const newComment = {
      commentId: Number(commentId),
      createAt: new Date().toISOString(),
      id: Date.now(),
      publicScope,
      text,
      userId: session?.user.id,
      userName: session?.user.name,
      userThumbnail: session?.user.image,
    };
    const newData = [...replyComments.comment, newComment];

    await pb
      .collection('replyComments')
      .update(replyComments.id, { comment: JSON.stringify(newData) });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();
  const { commentId, userId } = await request.json();

  if (userId !== session?.user.id)
    return NextResponse.json(null, { status: 403 });

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const replyComments = await pb
      .collection('replyComments')
      .getFirstListItem(`log="${id}"`);

    const newReplyComments = replyComments.comment.filter(
      (comment: ReplyCommentType) => comment.id !== Number(commentId),
    );

    await pb
      .collection('replyComments')
      .update(replyComments.id, { comment: JSON.stringify(newReplyComments) });

    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
