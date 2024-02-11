import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';

//유저 회원가입
export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const newData = {
      username: data.username,
      email: data.email,
      emailVisibility: true,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      nickname: data.nickname,
      isTerms: true,
      interests: data.interests,
      proposals: data.proposals,
    };
    // console.log(newData);
    const record = await pb.collection('users').create(newData);
    const verify = await pb
      .collection('users')
      .requestVerification(newData.email);
    console.log(verify);
    return NextResponse.json({ isCreated: true }, { status: 200 });
    // return NextResponse.json({ status: 200, ...record });
  } catch (error: any) {
    return NextResponse.json({ isCreated: false }, { status: 400 });
    // const errorData = error.originalError.data.data;
    // const firstKey = Object.keys(errorData)[0];
    // const errorMessage = errorData[firstKey as string].message;

    // return NextResponse.json({
    //   status: error.originalError.status || 400, // 상태 코드
    //   message: errorMessage || 'Failed to create record.', // 오류 메시지
    // });
  }
}
