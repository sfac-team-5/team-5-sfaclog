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
    const user = await pb
      .collection('users')
      .getOne(id, { expand: 'career,sns' });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
