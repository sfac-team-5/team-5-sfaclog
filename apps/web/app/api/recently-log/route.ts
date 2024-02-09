import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const recently = searchParams.get('recently');

  // 배열로 DB에서 직접 꺼내는 방법 아시는분?
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const logs = await pb.collection('logs').getFullList();

    const recentlyLogs = logs.filter(r => recently?.includes(r.id));

    recentlyLogs.forEach(recentlyLog => {
      const thumbnailFilename = recentlyLog.thumbnail;
      recentlyLog.thumbnailUrl = pb.files.getUrl(
        recentlyLog,
        thumbnailFilename,
        {
          thumb: '300x300',
        },
      );
    });

    return NextResponse.json(recentlyLogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
