import { IconPencil } from '@repo/ui/Icon';
import Link from 'next/link';
import React from 'react';

export function MyProfileHeader({
  updateMyPofileLink,
}: {
  updateMyPofileLink: string;
}) {
  return (
    <div className='mb-3 flex justify-between'>
      <div className='text-B1B16'>내 프로필</div>
      <div className='flex items-center justify-center gap-[5px]  rounded-md bg-neutral-5 px-2'>
        <Link href='/myprofile' className='text-text-secondary'>
          수정
        </Link>
        <div className='size-3 stroke-neutral-70'>
          <IconPencil className='fill-neutral-70' />
        </div>
      </div>
    </div>
  );
}
