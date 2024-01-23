import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// export async function GET(req: NextResponse) {
//   const pb = new PocketBase('http://3.35.176.72:8090');
//   const authData = await pb
//     .collection('users')
//     .authWithPassword('hong', 'hong123456');

//   return NextResponse.json(authData);
// }

export async function POST(req: NextResponse) {
  const { id, password } = await req.json();
  const pb = new PocketBase('http://3.35.176.72:8090');
  const authData = await pb.collection('users').authWithPassword(id, password);
  // if (!authData?.token) {
  //   return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
  //     status: 401,
  //   });
  // }

  cookies().set('newjeans', pb.authStore.exportToCookie(), { httpOnly: true });
  return NextResponse.json(authData);
}
