import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const count = await pb.collection('users').getOne(id, {
      fields: 'followerCount,followingCount',
    });

    let data;
    if (filter === 'followers') {
      data = await pb
        .collection('follower')
        .getFirstListItem(`userId="${id}"`, {
          expand: 'followerId',
        });
    } else if (filter === 'following') {
      data = await pb
        .collection('following')
        .getFirstListItem(`userId="${id}"`, {
          expand: 'followingId',
        });
    } else {
      return NextResponse.json({
        status: 500,
        message: 'Invalid filter.',
      });
    }

    const response = NextResponse.json({ count, data });
    response.headers.append(
      'Cache-Control',
      'no-cache, no-store, must-revalidate',
    );
    response.headers.append('Pragma', 'no-cache');
    response.headers.append('Expires', '0');
    return response;
  } catch (error: any) {
    const errorData = error.originalError;
    const errorMessage = errorData.message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message:
        errorMessage ||
        'Something went wrong while processing your request. Invalid filter.', // 오류 메시지
    });
  }
}
