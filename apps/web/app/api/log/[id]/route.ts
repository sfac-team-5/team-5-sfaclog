import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getOne(id);

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
  const formData = await request.json();

  const { title, content, user } = formData;

  try {
    const data = {
      user,
      title,
      content,
      views: 0,
      likes: 0,
      isVisibility: true,
    };
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').update(id, data);

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
