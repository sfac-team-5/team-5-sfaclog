import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { auth } from '@/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const bookmarks = await pb
      .collection('bookmarks')
      .getFirstListItem(`log="${id}"`);
    const isBookmark = bookmarks.user.includes(session?.user.id);

    return NextResponse.json({ isBookmark }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const bookmarks = await pb
      .collection('bookmarks')
      .getFirstListItem(`log="${id}"`);

    const isBookmark = bookmarks.user.includes(session?.user.id);

    let userList;
    if (!isBookmark) {
      userList = [...bookmarks.user, session?.user.id];
    } else {
      userList = bookmarks.user.filter(
        (item: string) => item !== session?.user.id,
      );
    }

    await pb
      .collection('bookmarks')
      .update(bookmarks.id, { user: JSON.stringify(userList) });

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
