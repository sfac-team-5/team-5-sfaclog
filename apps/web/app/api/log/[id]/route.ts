import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { LogDataType } from '../write/route';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const currentUser = url.searchParams.get('currentUser');
    const logId = url.pathname.split('/').pop() as string;

    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getOne(logId, { expand: 'user' });
    const logUser = log.expand?.user.id;

    if (currentUser) {
      // 현재 사용자의 팔로잉 목록 조회
      const followingList = await pb
        .collection('following')
        .getFirstListItem(`userId="${currentUser}"`, {
          expand: 'followingId',
        });

      // logUser가 currentUser에 의해 팔로우되고 있는지 확인
      const isFollowing = followingList.followingId.includes(logUser);
      return NextResponse.json({ log, isFollowing }, { status: 200 });
    } else {
      return NextResponse.json({ log }, { status: 200 });
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();
  const formData = await request.formData();
  const jsonTags = JSON.stringify(formData.getAll('tags'));

  try {
    const data: LogDataType = {
      user: session?.user.id,
      series: formData.get('series'),
      title: formData.get('title'),
      tags: jsonTags,
      thumbnail: formData.get('thumbnail'),
      content: formData.get('content'),
      isVisibility: formData.get('publicScope') === 'true',
    };
    if (typeof formData.get('thumbnail') === 'string') {
      delete data.thumbnail;
    }

    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').update(id, data);
    revalidatePath(`/log/${id}`);
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
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
  try {
    // const data = { isDelete: true };
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    await pb.collection('logs').delete(id);
    // const log = await pb.collection('logs').update(id, data);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
