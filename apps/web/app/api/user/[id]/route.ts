import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
//id로 유저정보 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const record = await pb.collection('users').getOne(id, {
      fields: '*',
      expand: 'career,sns',
    });

    const avatarFilename = record.avatar;
    record.avatarUrl = pb.files.getUrl(record, avatarFilename, {
      thumb: '300x300',
    });

    const response = NextResponse.json(record, { status: 200 });
    response.headers.append(
      'Cache-Control',
      'no-cache, no-store, must-revalidate',
    );
    response.headers.append('Pragma', 'no-cache');
    response.headers.append('Expires', '0');
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
