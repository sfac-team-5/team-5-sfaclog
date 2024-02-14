import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';

//유저 삭제하기
export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const user = await pb
      .collection('users')
      .authWithPassword(data.email, data.password)
      .then(user => user)
      .catch(() => null);

    if (user) {
      //팔로잉, 팔로워 삭제 - 먼저삭제해야 유저삭제가능
      console.log('-----------------', user.record.email);
      const followerId = await pb
        .collection('follower')
        .getFirstListItem(`userId="${user.record.id}"`, { expand: '*' });

      const followingId = await pb
        .collection('following')
        .getFirstListItem(`userId="${user.record.id}"`, { expand: '*' });
      await pb.collection('follower').delete(followerId.id);
      await pb.collection('following').delete(followingId.id);
      //유저삭제
      await pb.collection('users').delete(user.record.id);
      return NextResponse.json({ isDeleted: true }, { status: 200 });
    }
    return NextResponse.json({ isDeleted: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error,
        isSuccess: false,
      },
      { status: 500 },
    );
  }
}

// export async function POST(req: NextRequest, res: NextResponse) {
//   const data = await req.json();
//   try {
//     const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

//     if (data.action === 'signup') {
//       // 회원 가입
//       const newData = {
//         username: data.name,
//         email: data.email,
//         password: data.password,
//         passwordConfirm: data.passwordConfirm,
//         nickname: '',
//         isTerms: true,
//       };

//       const record = await pb.collection('users').create(newData);
//       return NextResponse.json({ status: 200, ...record });
//     } else {
//       // 잘못된 action 값 처리
//       return NextResponse.json({ status: 400, message: 'Invalid action' });
//     }
//   } catch (error: any) {
//     let errorMessage = error.originalError.data.message;

//     if (
//       error.originalError &&
//       error.originalError.data &&
//       typeof error.originalError.data.data === 'object'
//     ) {
//       const errorData = error.originalError.data.data;
//       const firstKey = Object.keys(errorData)[0];

//       // 첫 번째 키가 존재하고, 해당 값이 객체이며 message 속성을 가지고 있는 경우에만 errorMessage 업데이트
//       if (
//         firstKey &&
//         typeof errorData[firstKey] === 'object' &&
//         errorData[firstKey].message
//       ) {
//         errorMessage = errorData[firstKey].message;
//       }
//     }

//     return NextResponse.json({
//       status: error.originalError.status || 400, // 상태 코드
//       message: errorMessage || 'Failed.', // 오류 메시지
//     });
//   }
// }
