import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted');

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let records;

    if (sorted === 'popular') {
      records = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
        expand: 'user,series',
      });
      // 썸네일 URL 추가
      records.items.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });
      return NextResponse.json(records.items);
    }
    if (sorted === 'recently') {
      records = await pb.collection('logs').getFullList({
        sort: '-created',
        expand: 'user,series',
      });

      // 썸네일 URL 추가
      records.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
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
        expand: 'user,series',
        filter: following.followingId
          .map((id: string) => `user="${id}"`)
          .join('||'),
      });

      // 썸네일 URL 추가
      records.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });
      return NextResponse.json(records);
    }
    if (sorted === 'userlogs') {
      console.log('get user Logs!');
      const user = searchParams.get('user');
      records = await pb.collection('logs').getList(1, 3, {
        filter: `user="${user}"`,
      });

      return NextResponse.json(records.items);
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
