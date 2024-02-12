import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted') || 'recently';
  const tab = searchParams.get('tab') || 'log';
  const query = searchParams.get('query');
  console.log(query, sorted);
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let records;

    if (sorted === 'popular') {
      records = await pb.collection('logs').getFullList({
        sort: '-likes',
        filter: `title ~ '${query}' || content ~ '${query}'`,
      });
      // 썸네일 URL 추가
      records.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });
      return NextResponse.json(records, { status: 200 });
    }
    if (sorted === 'recently') {
      records = await pb.collection('logs').getFullList({
        sort: '-created',
        expand: 'tags',
        filter: `title ~ '${query}' || content ~ '${query}'`,
      });

      // 썸네일 URL 추가
      records.forEach(record => {
        const thumbnailFilename = record.thumbnail;
        record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
          thumb: '300x300',
        });
      });
      return NextResponse.json(records, { status: 200 });
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
