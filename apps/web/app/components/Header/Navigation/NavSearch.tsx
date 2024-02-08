'use client';
import { ModalSearch } from '@/components/Modal/ModalSearch';

import { IconSearch } from '@repo/ui/Icon';
import React, { useState } from 'react';

export function NavSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='group'>
      <button
        onClick={() => setIsModalOpen(true)}
        className='group-hover:border-primary-50 fill-neutral-90 bg-brand-10 rounded-full border-[1px] border-transparent p-[6px]  duration-100 ease-in-out'
      >
        <IconSearch className='size-5' />
      </button>
      {isModalOpen && <ModalSearch setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
