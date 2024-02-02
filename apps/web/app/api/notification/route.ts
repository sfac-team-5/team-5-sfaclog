import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: NextRequest) {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const userid = request.headers.get('userid');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

    const records = await pb.collection('notifications').getFullList({
      filter: `userId="${userid}" && created>="${thirtyDaysAgoISO}"`,
      sort: '-created',
    });

    console.log('>>>>> records', records);
    return NextResponse.json({ records });
  } catch (error: any) {
    const errorData = error.originalError.data;
    const firstKey = Object.keys(errorData)[0];
    const errorMessage = errorData[firstKey as string].message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message: errorMessage || 'An unexpected error occurred', // 오류 메시지
    });
  }
}
