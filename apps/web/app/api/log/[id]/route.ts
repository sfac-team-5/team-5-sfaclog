import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getOne(id, { expand: 'user' });

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const session = await auth();
  const formData = await request.formData();
  const isThumbnailChange = typeof formData.get('thumbnail') !== 'string';

  let thumbnailData;
  try {
    const data = {
      user: session?.user.id,
      series: formData.get('series'),
      title: formData.get('title'),
      tags: '',
      // thumbnail: formData.get('thumbnail'),
      content: formData.get('content'),
      views: 0,
      likes: 0,
      isVisibility: true,
    };
    if (isThumbnailChange) {
      thumbnailData = { ...data, thumbnail: formData.get('thumbnail') };
      // data['thumbnail'] = formData.get('thumbnail');
    }

    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb
      .collection('logs')
      .update(id, isThumbnailChange ? thumbnailData : data);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const data = { isDelete: true };
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').update(id, data);
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
