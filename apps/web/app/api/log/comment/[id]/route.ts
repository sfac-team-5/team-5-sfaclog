import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb
      .collection('comments')
      .getFirstListItem(`logId="${id}"`);

    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
