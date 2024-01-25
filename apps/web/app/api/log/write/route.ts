import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function POST(request: NextRequest) {
  try {
    // example create data
    // const data = {
    //     "user": "RELATION_RECORD_ID",
    //     "series": "RELATION_RECORD_ID",
    //     "title": "test",
    //     "tags": [
    //         "RELATION_RECORD_ID"
    //     ],
    //     "content": "test",
    //     "views": 123,
    //     "likes": 123,
    //     "isVisibility": true
    // };
    // const record = await pb.collection('logs').create(data);
  } catch (error: any) {
    return NextResponse.json({
      status: error.originalError?.status || 403, // 기본 상태 코드
      message: error.response.message || 'Failed to create record.', // 기본 메시지
    });
  }
}
