import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { LogDataType } from '../write/route';
import { revalidatePath } from 'next/cache';

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
  const jsonTags = JSON.stringify(formData.getAll('tags'));
  // const isThumbnailChange = typeof formData.get('thumbnail') !== 'string';

  // let thumbnailData;

  try {
    const data: LogDataType = {
      user: session?.user.id,
      series: formData.get('series'),
      title: formData.get('title'),
      tags: jsonTags,
      thumbnail: formData.get('thumbnail'),
      content: formData.get('content'),
      isVisibility: formData.get('publicScope') === 'true',
    };
    if (typeof formData.get('thumbnail') === 'string') {
      delete data.thumbnail;
    }
    // const data = {
    //   user: session?.user.id,
    //   series: formData.get('series'),
    //   title: formData.get('title'),
    //   tags: '',
    //   // thumbnail: formData.get('thumbnail'),
    //   content: formData.get('content'),
    //   views: 0,
    //   isVisibility: true,
    // };
    // if (isThumbnailChange) {
    //   thumbnailData = { ...data, thumbnail: formData.get('thumbnail') };
    //   // data['thumbnail'] = formData.get('thumbnail');
    // }

    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').update(id, data);
    revalidatePath(`/log/${id}`);
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
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
