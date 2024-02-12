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
    let isFollowingInfo = [];

    if (filter === 'followers') {
      result = await pb
        .collection('follower')
        .getFirstListItem(`userId="${id}"`, {
          expand: 'followerId',
        });

      // 현재 사용자의 팔로잉 목록 조회
      const followingList = await pb
        .collection('following')
        .getFirstListItem(`userId="${id}"`, {
          expand: 'followingId',
        });

      isFollowingInfo = result.followerId.map((followerId: string) => {
        return {
          id: followerId,
          isFollowing: followingList.followingId.includes(followerId),
        };
      });

      // 각 팔로워가 현재 사용자에 의해 팔로우되고 있는지 확인
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

    const response = NextResponse.json({
      count,
      result,
      isFollowingInfo,
    });
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
      // 1. 사용자의 팔로잉 목록에서 타겟 사용자를 제거
      const followings = await pb
        .collection('following')
        .getFirstListItem(`userId="${data.userId}"`);
      const updatedFollowingIds = followings.followingId.filter(
        (id: string) => id !== data.targetId,
      );
      await pb
        .collection('following')
        .update(followings.id, { followingId: updatedFollowingIds });

      // 2. 타겟 사용자의 팔로워 목록에서 현재 사용자를 제거
      const followers = await pb
        .collection('follower')
        .getFirstListItem(`userId="${data.targetId}"`);
      const updatedFollowerIds = followers.followerId.filter(
        (id: string) => id !== data.userId,
      );
      await pb
        .collection('follower')
        .update(followers.id, { followerId: updatedFollowerIds });

      // 3. 현재 사용자의 팔로잉 수를 감소
      const currentUser = await pb.collection('users').getOne(data.userId);
      if (currentUser.followingCount > 0) {
        const updatedFollowingCount = currentUser.followingCount - 1;
        await pb
          .collection('users')
          .update(data.userId, { followingCount: updatedFollowingCount });
      }

      // 4. 대상 사용자의 팔로워 수를 감소
      const targetUser = await pb.collection('users').getOne(data.targetId);
      if (targetUser.followerCount > 0) {
        const updatedFollowerCount = targetUser.followerCount - 1;
        await pb
          .collection('users')
          .update(data.targetId, { followerCount: updatedFollowerCount });
      }
    } else if (data.type === 'follow') {
      // 1. 사용자의 팔로잉 목록에 타겟 사용자를 추가
      const followings = await pb
        .collection('following')
        .getFirstListItem(`userId="${data.userId}"`);

      if (!followings.followingId.includes(data.targetId)) {
        const updatedFollowingIds = [...followings.followingId, data.targetId];
        await pb
          .collection('following')
          .update(followings.id, { followingId: updatedFollowingIds });
      }

      // 2. 타겟 사용자의 팔로워 목록에 현재 사용자를 추가
      const followers = await pb
        .collection('follower')
        .getFirstListItem(`userId="${data.targetId}"`);

      if (!followers.followerId.includes(data.userId)) {
        const updatedFollowerIds = [...followers.followerId, data.userId];
        await pb
          .collection('follower')
          .update(followers.id, { followerId: updatedFollowerIds });
      }

      // 3. 현재 사용자의 팔로잉 수를 증가
      const currentUser = await pb.collection('users').getOne(data.userId);
      const updatedFollowingCount = currentUser.followingCount + 1;
      await pb
        .collection('users')
        .update(data.userId, { followingCount: updatedFollowingCount });

      // 4. 대상 사용자의 팔로워 수를 증가
      const targetUser = await pb.collection('users').getOne(data.targetId);
      const updatedFollowerCount = targetUser.followerCount + 1;
      await pb
        .collection('users')
        .update(data.targetId, { followerCount: updatedFollowerCount });
    } else if (data.type === 'delete') {
      // 1. 타겟 사용자의 팔로잉 목록에서 현재 사용자를 제거
      const targetFollowing = await pb
        .collection('following')
        .getFirstListItem(`userId="${data.targetId}"`);
      const updatedTargetFollowingIds = targetFollowing.followingId.filter(
        (id: string) => id !== data.userId,
      );
      await pb
        .collection('following')
        .update(targetFollowing.id, { followingId: updatedTargetFollowingIds });

      // 2. 현재 사용자의 팔로워 목록에서 타겟 사용자를 제거
      const userFollowers = await pb
        .collection('follower')
        .getFirstListItem(`userId="${data.userId}"`);
      const updatedUserFollowerIds = userFollowers.followerId.filter(
        (id: string) => id !== data.targetId,
      );
      await pb
        .collection('follower')
        .update(userFollowers.id, { followerId: updatedUserFollowerIds });

      // 3. 타겟 사용자의 팔로잉 수를 감소
      const targetUser = await pb.collection('users').getOne(data.targetId);
      if (targetUser.followingCount > 0) {
        await pb.collection('users').update(data.targetId, {
          followingCount: targetUser.followingCount - 1,
        });
      }

      // 4. 현재 사용자의 팔로워 수를 감소
      const currentUser = await pb.collection('users').getOne(data.userId);
      if (currentUser.followerCount > 0) {
        await pb.collection('users').update(data.userId, {
          followerCount: currentUser.followerCount - 1,
        });
      }
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
