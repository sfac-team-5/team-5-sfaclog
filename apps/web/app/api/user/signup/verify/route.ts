import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';

//이 라우트는 pb 메일 설정에서 사용
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const verifyToken = searchParams.get('token');
  //   console.log('verifyToken = ', verifyToken);
  let pb;

  try {
    pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'can not connect to database',
      },
      { status: 400 },
    );
  }

  try {
    let confirmResult;
    if (verifyToken) {
      confirmResult = await pb
        .collection('users')
        .confirmVerification(verifyToken);
    }

    if (confirmResult) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup/welcome`,
      );
    }
  } catch (err) {
    return NextResponse.json({ message: 'someting went wrong' });
    //404로 가야함 나중에 수정해야함
  }
}
