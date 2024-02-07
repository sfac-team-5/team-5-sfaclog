import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/auth';
import { LogoutAction, userDeleteAction } from './action';
import { ButtonRound } from '@repo/ui/ButtonRound';
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
          <div className='mx-2 '>{session?.user.name}</div>
          <div className='mx-2 '>{session?.user.email}</div>
          <form action={LogoutAction}>
            <button type='submit'>로그아웃</button>
          </form>
          {/* <form
          action={async () => {
            'use server';
            await userDeleteAction(session.user.id);
            await signOut();
          }}
          >
            <button>회원 탈퇴</button>
          </form> */}
        </div>
      ) : (
        <div className='flex gap-2'>
          <ButtonRound type='outline'>
            <Link href={'/login'}>로그인</Link>
          </ButtonRound>
          <ButtonRound type='filled'>
            <Link href={'/signup/policy'}>회원가입</Link>
          </ButtonRound>
        </div>
      )}
    </div>
  );
}
