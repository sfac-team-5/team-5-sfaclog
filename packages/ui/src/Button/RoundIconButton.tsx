'use client';

import React from 'react';

interface CapsuleButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  defaultIcon: React.ReactNode;
  hoverIcon: React.ReactNode;
}

function RoundIconButton({
  onClick,
  defaultIcon,
  hoverIcon,
}: CapsuleButtonProps) {
  return (
    <button
      onClick={onClick}
      className='bg-brand-10 hover:bg-brand-90 active:bg-brand-90 group relative flex items-center rounded-full p-1.5 duration-200 ease-in-out'
    >
      {React.cloneElement(defaultIcon as React.ReactElement, {
        className: 'size-5 group-hover:hidden group-active:hidden',
      })}
      {React.cloneElement(hoverIcon as React.ReactElement, {
        className: 'hidden size-5 group-hover:block group-active:block',
      })}
    </button>
  );
}

export default RoundIconButton;
