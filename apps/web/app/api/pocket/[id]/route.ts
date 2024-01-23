import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const pb = new PocketBase('http://3.35.176.72:8090');
    // const resultList = await pb.collection('logs').getOne(params.id);
    // return NextResponse.json({ resultList });
  } catch (err) {
    return NextResponse.json(
      { message: 'An error has occurred!' },
      { status: 404 },
    );
  }
}
