import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sorted = searchParams.get('sorted');

  try {
    const pb = new PocketBase('http://3.35.176.72:8090');
    let resultList;

    if (sorted === 'popular') {
      resultList = await pb.collection('logs').getFullList({
        sort: '-likes',
      });
      return NextResponse.json(resultList);
    }
    if (sorted === 'recently') {
      resultList = await pb.collection('logs').getFullList({
        sort: '-created',
      });
      return NextResponse.json(resultList);
    }
    if (sorted === 'following') {
      // const authData = await pb.collection('users').authRefresh();
      // console.log(authData);
      // resultList = await pb.collection('logs').getFullList({
      //   // filter: 'user',
      // });
      return NextResponse.json(resultList);
    }
  } catch (error) {
    return NextResponse.json({ status: 404 });
  }
}
