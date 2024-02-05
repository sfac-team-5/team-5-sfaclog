'use  client';

import React from 'react';
import { IconHeartBlack, IconHeartBlue } from '../../public/svgs';

interface CapsuleButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function HeartCapsuleButton({ label, onClick }: CapsuleButtonProps) {
  return (
    <button
      onClick={onClick}
      className='border-neutral-10 hover:border-brand-50 active:bg-brand-90 text-B2M14 text-neutral-70 group relative flex items-center gap-1 rounded-full border bg-white px-4 py-2.5 duration-200 ease-in-out'
    >
      <IconHeartBlack className='size-4 group-hover:hidden group-active:hidden' />
      <IconHeartBlue className='hidden size-4 group-hover:block group-active:block' />
      <div className='flex items-center justify-center gap-1.5'>{label}</div>
    </button>
  );
}

export default HeartCapsuleButton;
