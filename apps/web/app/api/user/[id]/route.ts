import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const record = await pb.collection('users').getOne(id, {
      fields: '*, email',
    });
    const avatarFilename = record.avatar;
    record.avatarUrl = pb.files.getUrl(record, avatarFilename, {
      thumb: '300x300',
    });

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
