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
      <Link href={updateMyPofileLink || '#'}>
        <div className='bg-neutral-5 flex items-center justify-center  gap-[5px] rounded-md px-2'>
          <div className='text-text-secondary'>수정</div>
          <div className='stroke-neutral-70 size-3'>
            <IconPencil className='fill-neutral-70' />
          </div>
        </div>
      </Link>
    </div>
  );
}
