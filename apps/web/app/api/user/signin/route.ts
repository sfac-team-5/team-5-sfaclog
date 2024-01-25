import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
  const data = await req.json();
  console.log(data);
  const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

  let authData;

  return NextResponse.json(authData);
}
