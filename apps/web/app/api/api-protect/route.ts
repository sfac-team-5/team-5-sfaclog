import { NextResponse } from 'next/server';
import { auth } from '../../auth';

export const GET = auth(async req => {
  //req == GET(req) 와 같은 req
  if (req.auth) {
    console.log('------req.auth-------');
    console.log(req.auth);
    console.log('---------------------');
    return NextResponse.json({ data: req.auth });
  }

  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
}) as any; // TODO: Fix `auth()` return type
