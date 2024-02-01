import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted');

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let records;

    if (sorted === 'popular') {
      records = await pb.collection('communities').getList(1, 5, {
        sort: '-likes',
        expand: 'author',
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
