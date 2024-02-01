import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

interface CommunityDataType {
  author: string | undefined;
  category: FormDataEntryValue | null;
  title: FormDataEntryValue | null;
  tags: string;
  content: FormDataEntryValue | null;
  views: number;
  likes: number;
  isVisibility: boolean;
}

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

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();
  const jsonTags = JSON.stringify(formData.getAll('tags'));

  try {
    const data: CommunityDataType = {
      author: session?.user.id,
      category: formData.get('series'),
      title: formData.get('title'),
      tags: jsonTags,
      content: formData.get('content'),
      views: 0,
      likes: 0,
      isVisibility: true,
    };
    console.log(data);
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const newCommunity = await pb.collection('communities').create(data);

    return NextResponse.json(newCommunity);
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
