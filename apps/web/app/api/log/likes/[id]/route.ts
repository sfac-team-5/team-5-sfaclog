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
    const likeLogs = await pb
      .collection('likeLogs')
      .getFirstListItem(`log="${id}"`);
    const isLike = likeLogs.user.includes(session?.user.id);

    return NextResponse.json(
      { likes: likeLogs.user.length, isLike },
      { status: 201 },
    );
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
    const likeLogs = await pb
      .collection('likeLogs')
      .getFirstListItem(`log="${id}"`);

    const isIncluded = likeLogs.user.includes(session?.user.id);

    let userList;
    if (!isIncluded) {
      userList = [...likeLogs.user, session?.user.id];
    } else {
      userList = likeLogs.user.filter(
        (item: string) => item !== session?.user.id,
      );
    }

    const newLikeLogs = await pb
      .collection('likeLogs')
      .update(likeLogs.id, { user: JSON.stringify(userList) });

    return NextResponse.json(
      { likes: newLikeLogs.user.length },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
