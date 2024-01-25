import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.json();

  const { title, content } = formData;

  try {
    const data = {
      user: session?.user.id,
      title,
      content,
      views: 0,
      likes: 0,
      isVisibility: true,
    };
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const newLog = await pb.collection('logs').create(data);

    return NextResponse.json(newLog);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
