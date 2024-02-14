import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';

//비밀번호 재설정 이메일 발송
export async function POST(req: NextRequest) {
  const { username, email } = await req.json();
  console.log('INSIDE FINDPW', username, email);
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const record = await pb
      .collection('users')
      .getFirstListItem(`username="${username}"&&email="${email}"`);
    // console.log(record);
    if (record) {
      await pb.collection('users').requestPasswordReset(email);
    }

    return NextResponse.json({ isSend: true }, { status: 200 });
    // return NextResponse.json({ status: 200, ...record });
  } catch (error) {
    return NextResponse.json({ isSend: false }, { status: 400 });
  }
}
