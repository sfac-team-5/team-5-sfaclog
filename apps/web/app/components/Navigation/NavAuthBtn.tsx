import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { auth, signOut } from '@/auth';
import { userDeleteAction } from './action';

export async function NavAuthBtn() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className='flex'>
          <Image
            src={session.user.image || ''}
            width={30}
            height={30}
            alt='avatar'
            className='rounded-full'
          />
          <div className='mx-2 text-white'>{session?.user.name}</div>
          <div className='mx-2 text-white'>{session?.user.email}</div>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type='submit'>로그아웃</button>
          </form>
          <form
            action={async () => {
              'use server';
              await userDeleteAction(session.user.id);
              await signOut();
            }}
          >
            <button>회원 탈퇴</button>
          </form>
        </div>
      ) : (
        <div className='flex'>
          <Link href='/signup' className='mx-2 border-2 p-2  text-white'>
            회원가입
          </Link>
          <Link href='/login' className='mx-2 border-2 p-2  text-white'>
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}
