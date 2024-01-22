import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const pb = new PocketBase('http://3.35.176.72:8090');

    const resultList = await pb.collection('logs').getOne(params.id);
    return NextResponse.json(resultList);
  } catch (error) {
    return NextResponse.json({ status: '500' }, { status: 500 });
  }

  // const pb = new PocketBase('http://3.35.176.72:8090');
  // const resultList = await pb.collection('logs').getOne(params.id);
  // console.log('resultList', resultList);
  // if (!resultList) return NextResponse.json(resultList);
  // else return NextResponse.json({ status: 404 });
}
