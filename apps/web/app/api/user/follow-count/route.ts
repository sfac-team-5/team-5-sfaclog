import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const follow = await pb
      .collection('users')
      .getFirstListItem(`id="${userId}"`);

    return NextResponse.json(
      {
        follow: follow.followerCount,
        follower: follow.followingCount,
      },
      { status: 200 },
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
