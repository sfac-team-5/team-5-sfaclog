'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconKebob } from '@public/svgs';

interface KebobMenuProps {
  logId: string;
}

function KebobMenu({ logId }: KebobMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <IconKebob
        className='mb-3 cursor-pointer'
        onClick={() => setIsOpen(prev => !prev)}
      />
      {isOpen && (
        <ul className='text-B2R14 shadow-custom absolute right-0 z-10 w-[88px] rounded-[6px] bg-white px-1.5 py-2'>
          <li
            onClick={() => router.push(`/log/edit/${logId}`)}
            className='hover:bg-brand-10 text-neutral-70 h-[42px] cursor-pointer rounded-[4px] p-3 duration-200 hover:text-[#0059FF]'
          >
            수정하기
          </li>
          <li
            onClick={() => router.push(`/modal?type=log-delete&id=${logId}`)}
            className='hover:bg-brand-10 text-neutral-70 h-[42px] cursor-pointer rounded-[4px] p-3 duration-200 hover:text-[#0059FF]'
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}

export default KebobMenu;
