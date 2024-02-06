import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';

//비밀번호 재설정
export async function POST(req: NextRequest) {
  const { password, passwordConfirm, token } = await req.json();
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const result = await pb
      .collection('users')
      .confirmPasswordReset(`${token}`, `${password}`, `${passwordConfirm}`);
    console.log('result =', result);
    return NextResponse.json({ isChange: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isChange: false }, { status: 400 });
  }
}
