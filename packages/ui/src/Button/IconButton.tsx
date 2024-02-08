'use client';

import React from 'react';

interface CapsuleButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  defaultIcon: React.ReactNode;
  hoverIcon: React.ReactNode;
}

function IconButton({ onClick, defaultIcon, hoverIcon }: CapsuleButtonProps) {
  return (
    <button
      onClick={onClick}
      className='border-neutral-10 hover:border-brand-90 active:border-brand-90 group relative flex items-center rounded-md border bg-white p-2.5 duration-200 ease-in-out'
    >
      {React.cloneElement(defaultIcon as React.ReactElement, {
        className: 'size-4 group-hover:hidden group-active:hidden',
      })}
      {React.cloneElement(hoverIcon as React.ReactElement, {
        className: 'hidden size-4 group-hover:block group-active:block',
      })}
    </button>
  );
}

export default IconButton;
