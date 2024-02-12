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

    let result;
    if (filter === 'followers') {
      result = await pb
        .collection('follower')
        .getFirstListItem(`userId="${id}"`, {
          expand: 'followerId',
        });
    } else if (filter === 'following') {
      result = await pb
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

    const response = NextResponse.json({ count, result });
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

export async function POST(request: NextRequest) {
  // follow state update
  const data = await request.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    if (data.type === 'unfollow') {
      // following 컬렉션에서 해당 사용자의 레코드를 찾아 followingId 리스트에서 targetId 제거
      const followings = await pb
        .collection('following')
        .getFirstListItem(`userId="${data.userId}"`);
      const updatedFollowingIds = followings.followingId.filter(
        (id: string) => id !== data.targetId,
      );
      await pb
        .collection('following')
        .update(followings.id, { followingId: updatedFollowingIds });

      // follower 컬렉션에서 대상 사용자의 레코드를 찾아 followerId 리스트에서 userId 제거
      const followers = await pb
        .collection('follower')
        .getFirstListItem(`userId="${data.targetId}"`);
      const updatedFollowerIds = followers.followerId.filter(
        (id: string) => id !== data.userId,
      );
      await pb
        .collection('follower')
        .update(followers.id, { followerId: updatedFollowerIds });

      // 현재 사용자의 following 수 감소
      const currentUser = await pb.collection('users').getOne(data.userId);
      if (currentUser.followingCount > 0) {
        // 수가 음수가 되지 않도록 확인
        const updatedFollowingCount = currentUser.followingCount - 1;
        await pb
          .collection('users')
          .update(data.userId, { followingCount: updatedFollowingCount });
      }

      // 대상 사용자의 follower 수 감소
      const targetUser = await pb.collection('users').getOne(data.targetId);
      if (targetUser.followerCount > 0) {
        // 수가 음수가 되지 않도록 확인
        const updatedFollowerCount = targetUser.followerCount - 1;
        await pb
          .collection('users')
          .update(data.targetId, { followerCount: updatedFollowerCount });
      }
    } else if (data.type === 'follow') {
      // following 컬렉션에서 해당 사용자의 레코드를 찾아 followingId 리스트에 targetId 추가
      const followings = await pb
        .collection('following')
        .getFirstListItem(`userId="${data.userId}"`);
      // 이미 followingId 리스트에 targetId가 있는지 확인
      if (!followings.followingId.includes(data.targetId)) {
        const updatedFollowingIds = [...followings.followingId, data.targetId];
        await pb
          .collection('following')
          .update(followings.id, { followingId: updatedFollowingIds });
      }

      // follower 컬렉션에서 대상 사용자의 레코드를 찾아 followerId 리스트에 userId 추가
      const followers = await pb
        .collection('follower')
        .getFirstListItem(`userId="${data.targetId}"`);
      // 이미 followerId 리스트에 userId가 있는지 확인
      if (!followers.followerId.includes(data.userId)) {
        const updatedFollowerIds = [...followers.followerId, data.userId];
        await pb
          .collection('follower')
          .update(followers.id, { followerId: updatedFollowerIds });
      }

      // 현재 사용자의 following 수 증가
      const currentUser = await pb.collection('users').getOne(data.userId);
      const updatedFollowingCount = currentUser.followingCount + 1;
      await pb
        .collection('users')
        .update(data.userId, { followingCount: updatedFollowingCount });

      // 대상 사용자의 follower 수 증가
      const targetUser = await pb.collection('users').getOne(data.targetId);
      const updatedFollowerCount = targetUser.followerCount + 1;
      await pb
        .collection('users')
        .update(data.targetId, { followerCount: updatedFollowerCount });
    } else {
      return NextResponse.json({
        status: 500,
        message: 'Invalid type.',
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    const errorData = error.originalError;
    const errorMessage = errorData.message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message: errorMessage || 'An unexpected error occurred', // 오류 메시지
    });
  }
}
