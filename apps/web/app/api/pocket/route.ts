import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  //   try {
  const pb = new PocketBase('http://3.35.176.72:8090');
  const resultList = await pb.collection('users').getOne(params.id);
  console.log('resultList', resultList);
  return NextResponse.json({ resultList });
  // else return NextResponse.json({ status: 404 });
  //   } catch (err) {
  // return NextResponse.json({ status: 500 });
  //   }
  //   const pb = new PocketBase('http://3.35.176.72:8090');
  //   const authData = await pb
  //     .collection('users')
  //     .authWithPassword('hong', 'hong123456');

  //   const response = await fetch(
  //     'http://3.35.176.72:8090/api/collections/users/records',
  //     {
  //       headers: {
  //         Authorization: pb.authStore.token,
  //       },
  //     },
  //   );
  //   const users = await response.json();
  //   cookies().set('token', pb.authStore.token);
  //   const res = NextResponse.next();
  //   cookies.set('token', pb.authStore.token, { httpOnly: true });
  //   res.s;
}
