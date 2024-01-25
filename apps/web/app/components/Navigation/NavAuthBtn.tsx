import React from 'react';
import { auth } from '../../auth';
import Image from 'next/image';
export async function NavAuthBtn() {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <div className='flex'>
          <Image
            src={session.user.image || 'fallbackImg'}
            width={30}
            height={30}
            alt='avatar'
            className='rounded-full'
          />
          <div className='mx-2  text-white'>{session?.user.name}</div>
          <div className='mx-2 text-white'>{session?.user.email}</div>
        </div>
      ) : (
        <div className='flex'>
          <button className='mx-2 border-2 p-2  text-white'>회원가입</button>
          <button className='mx-2 border-2 p-2  text-white'>로그인</button>
        </div>
      )}
    </div>
  );
}
