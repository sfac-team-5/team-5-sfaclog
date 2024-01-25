import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted');

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let records;

    if (sorted === 'popular') {
      records = await pb.collection('logs').getFullList({
        sort: '-likes',
      });
      return NextResponse.json(records);
    }
    if (sorted === 'recently') {
      records = await pb.collection('logs').getFullList({
        sort: '-created',
      });
      return NextResponse.json(records);
    }
    if (sorted === 'following') {
      const user = searchParams.get('user');
      const following = await pb
        .collection('following')
        .getFirstListItem(`userId="${user}"`, {
          expand: 'users',
        });

      if (
        !following ||
        !following.followingId ||
        following.followingId.length === 0
      ) {
        return NextResponse.json([]);
      }

      records = await pb.collection('logs').getFullList({
        sort: '-created',
        filter: following.followingId
          .map((id: string) => `user="${id}"`)
          .join('||'),
      });

      return NextResponse.json(records);
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}