import { LogType } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

interface sortObjType {
  sort?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const recently = searchParams.get('recently');
  const page = searchParams.get('page');
  const sort = searchParams.get('sort');
  if (!page) return NextResponse.json(null, { status: 404 });

  const sortObj: sortObjType = {};
  if (sort === 'recently') {
    sortObj.sort = '-created';
  } else if (sort === 'popular') {
    sortObj.sort = '-views';
  } else if (sort === 'oldest') {
    sortObj.sort = 'created';
  }

  // DB에서 직접 꺼내는 방법 아시는분?
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const logs = await pb
      .collection('logs')
      .getFullList<LogType>({ ...sortObj });

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

    const result = recentlyLogs.slice(6 * (Number(page) - 1), 6 * Number(page));

    return NextResponse.json(
      { recentlyLogs: result, totalItems: recentlyLogs.length },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
