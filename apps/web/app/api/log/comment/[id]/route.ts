import { CommentType } from '@/(route)/log/[id]/(components)/CommentSection/LogComment';
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
  const { text, publicScope } = await request.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const comments = await pb
      .collection('comments')
      .getFirstListItem(`log="${id}"`);

    const newComment = {
      createAt: new Date().toISOString(),
      id: Date.now(),
      publicScope,
      text,
      userId: session?.user.id,
      userName: session?.user.name,
      userThumbnail: session?.user.image,
    };
    const newData = [...comments.comment, newComment];

    await pb
      .collection('comments')
      .update(comments.id, { comment: JSON.stringify(newData) });
    revalidatePath(`/log/${id}`);
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
    const comments = await pb
      .collection('comments')
      .getFirstListItem(`log="${id}"`);

    const newComments = comments.comment.filter(
      (comment: CommentType) => comment.id !== Number(commentId),
    );

    await pb
      .collection('comments')
      .update(comments.id, { comment: JSON.stringify(newComments) });

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
