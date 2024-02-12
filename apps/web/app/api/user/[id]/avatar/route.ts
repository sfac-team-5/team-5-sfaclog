import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const record = await pb.collection('users').getOne(id);

    let avatarUrl = null;
    if (record.avatar) {
      avatarUrl = pb.files.getUrl(record, record.avatar, {
        thumb: '300x300',
      });
    }

    const response = NextResponse.json({ avatarUrl }, { status: 200 });
    response.headers.append(
      'Cache-Control',
      'no-cache, no-store, must-revalidate',
    );
    response.headers.append('Pragma', 'no-cache');
    response.headers.append('Expires', '0');
    return response;
  } catch (error: any) {
    const errorData = error.originalError;
    const firstKey = Object.keys(errorData)[0];
    const errorMessage = errorData[firstKey as string].message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message: errorMessage || 'Failed to fetch.', // 오류 메시지
    });
  }
}
