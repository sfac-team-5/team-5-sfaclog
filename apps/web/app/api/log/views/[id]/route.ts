import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getOne(id);
    const updateLog = await pb
      .collection('logs')
      .update(id, { views: log.views + 1 });

    return NextResponse.json(updateLog.views, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
