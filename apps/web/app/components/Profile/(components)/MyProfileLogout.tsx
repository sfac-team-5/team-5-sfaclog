import { signOut } from '@/auth';
import { IconTaillessArrowRightBlack } from '@repo/ui/Icon';
import React from 'react';

export function MyProfileLogout() {
  return (
    <form
      className='inline-block h-fit cursor-pointer'
      action={async () => {
        'use server';
        await signOut({ redirect: true, redirectTo: '/' });
      }}
    >
      <div className='flex justify-between'>
        <button type='submit' className='text-B2R14 cursor-pointer'>
          로그아웃
        </button>
        <div className='size-4'>
          <IconTaillessArrowRightBlack />
        </div>
      </div>
    </form>
  );
}
