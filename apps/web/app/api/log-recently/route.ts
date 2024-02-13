import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const page = searchParams.get('page');

  // await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (category === '전체') {
      logs = await pb.collection('logs').getList(Number(page), 6, {
        sort: '-created',
        expand: 'user',
      });
    } else {
      logs = await pb.collection('logs').getList(Number(page), 6, {
        sort: '-created',
        expand: 'user',
        filter: `series="${category}"`,
      });
    }

    logs.items.forEach(log => {
      const thumbnailFilename = log.thumbnail;
      log.thumbnailUrl = pb.files.getUrl(log, thumbnailFilename, {
        thumb: '300x300',
      });
    });

    return NextResponse.json(logs.items);
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
