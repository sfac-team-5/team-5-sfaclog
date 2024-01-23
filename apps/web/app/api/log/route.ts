import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted');

  try {
    const pb = new PocketBase('http://3.35.176.72:8090');
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
  } catch (error: any) {
    return NextResponse.json({
      status: error.originalError?.status || 500, // 기본 상태 코드
      message: error.response.message || 'An unexpected error occurred', // 기본 메시지
    });
  }
}

export async function POST(request: NextRequest) {
  const { sorted, user } = await request.json();

  try {
    const pb = new PocketBase('http://3.35.176.72:8090');

    if (sorted === 'following') {
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

      const records = await pb.collection('logs').getFullList({
        sort: '-created',
        filter: following.followingId
          .map((id: string) => `user="${id}"`)
          .join('||'),
      });

      return NextResponse.json(records);
    }
  } catch (error: any) {
    return NextResponse.json({
      status: error.originalError?.status || 500, // 기본 상태 코드
      message: error.response.message || 'An unexpected error occurred', // 기본 메시지
    });
  }
}
