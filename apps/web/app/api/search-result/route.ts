import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted') || 'recently';
  const query = searchParams.get('query');
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logRecords;
    let userRecords;

    if (sorted === 'popular') {
      logRecords = await pb.collection('logs').getFullList({
        sort: '-likes',
        expand: 'user',
        filter: `title ~ '${query}' || content ~ '${query}'`,
      });

      userRecords = await pb.collection('users').getFullList({
        sort: '-followerCount',
        expand: 'interests',
        filter: `nickname ~ '${query}' || intro ~ '${query}'`,
      });

      userRecords.forEach(record => {
        const avatarFilename = record.avatar;
        record.avatar = pb.files.getUrl(record, avatarFilename, {
          thumb: '50x50',
        });
      });

      // 썸네일 URL 추가
      logRecords.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });

      return NextResponse.json({ logRecords, userRecords }, { status: 200 });
    }
    if (sorted === 'recently') {
      logRecords = await pb.collection('logs').getFullList({
        sort: '-created',
        expand: 'user',
        filter: `title ~ '${query}' || content ~ '${query}'`,
      });

      userRecords = await pb.collection('users').getFullList({
        sort: '-created',
        expand: 'interests',
        filter: `nickname ~ '${query}' || intro ~ '${query}'`,
      });

      userRecords.forEach(record => {
        const avatarFilename = record.avatar;
        record.avatar = pb.files.getUrl(record, avatarFilename, {
          thumb: '50x50',
        });
      });

      // 썸네일 URL 추가
      logRecords.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });

      return NextResponse.json({ logRecords, userRecords }, { status: 200 });
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
