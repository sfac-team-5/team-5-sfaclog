import PocketBase from 'pocketbase';
import { type NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  //이메일, 닉네임 중복체크 로직
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type'); //email or nickname type
  const data = searchParams.get('data'); //email or nickname data
  //db
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
  console.log('handler = ', type, data);
  // try {
  //pocketbase 상에서 데이터를 못 찾으면 에러를 발생시킴
  //에러 처리 부분을 중복검사 통과로 설정하고 200코드 리턴하도록 설정하였음
  //   const record = await pb
  //     .collection('users')
  //     .getFirstListItem(`${type}="${data}"`);

  //   return NextResponse.json({ isDuplicate: true }, { status: 200 });
  // } catch (err) {
  //   return NextResponse.json(
  //     {
  //       isDuplicate: false,
  //     },
  //     { status: 200 },
  //   );
  // }
  const record = await pb
    .collection('users')
    .getFirstListItem(`${type}="${data}"`)
    .then(result => result)
    .catch(() => null);
  if (!record) {
    return NextResponse.json(
      {
        isDuplicate: false,
      },
      { status: 200 },
    );
  }
  return NextResponse.json({ isDuplicate: true }, { status: 200 });
}
