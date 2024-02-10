import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export interface LogDataType {
  user: string | undefined;
  series: FormDataEntryValue | null;
  title: FormDataEntryValue | null;
  tags: string;
  thumbnail?: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  views?: number;
  likes?: number;
  isVisibility: boolean;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();
  const jsonTags = JSON.stringify(formData.getAll('tags'));

  try {
    const data: LogDataType = {
      user: session?.user.id,
      series: formData.get('series'),
      title: formData.get('title'),
      tags: jsonTags,
      thumbnail: formData.get('thumbnail'),
      content: formData.get('content'),
      views: 0,
      likes: 0,
      isVisibility: true,
    };
    if (formData.get('thumbnail') === 'null') {
      delete data.thumbnail;
    }

    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const newLog = await pb.collection('logs').create(data);
    await pb
      .collection('comments')
      .create({ log: newLog.id, comment: JSON.stringify([]) });
    await pb
      .collection('replyComments')
      .create({ log: newLog.id, comment: JSON.stringify([]) });
    await pb
      .collection('likeLogs')
      .create({ log: newLog.id, user: JSON.stringify([]) });
    await pb
      .collection('bookmarks')
      .create({ log: newLog.id, user: JSON.stringify([]) });

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
