'use client';

import { IconPencil, IconTaillessArrowUpBlue } from '@repo/ui/Icon';
import Link from 'next/link';
import React from 'react';

interface FloatingButtonsProps {
  writeUrl: string;
}

export function FloatingButtons({ writeUrl }: FloatingButtonsProps) {
  const scrollToTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='bottom fixed bottom-12 right-12 flex flex-col gap-3 z-10'>
      <Link
        href={writeUrl}
        className='bg-brand-90 border-brand-90 shadow-custom flex size-10 items-center justify-center rounded-full border-2 p-1.5'
      >
        <IconPencil fill='white' size={10} />
      </Link>
      <button
        onClick={scrollToTop}
        className='border-brand-90 shadow-custom flex size-10 items-center justify-center rounded-full border-2 bg-white p-1.5'
      >
        <IconTaillessArrowUpBlue />
      </button>
    </div>
  );
}
