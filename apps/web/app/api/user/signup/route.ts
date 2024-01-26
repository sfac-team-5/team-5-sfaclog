import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
  const data = await req.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const newData = {
      username: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      nickname: '',
      isTerms: true,
    };

    const record = await pb.collection('users').create(newData);

    return NextResponse.json({ status: 200, ...record });
  } catch (error: any) {
    const errorData = error.originalError.data.data;
    const firstKey = Object.keys(errorData)[0];
    const errorMessage = errorData[firstKey as string].message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message: errorMessage || 'Failed to create record.', // 오류 메시지
    });
  }
}
