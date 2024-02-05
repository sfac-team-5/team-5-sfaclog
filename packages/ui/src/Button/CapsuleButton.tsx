'use  client';

import React from 'react';

interface CapsuleButtonProps {
  label: string;
  size?: keyof typeof btnSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const btnSize = {
  s: 'h-[32px] px-4',
  m: 'h-[36px] px-4',
  l: 'h-[40px] px-6',
};

function CapsuleButton({
  label,
  size = 's',
  disabled,
  onClick,
}: CapsuleButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} bg-brand-70 hover:bg-brand-90 active:bg-brand-90 text-B2M14 rounded-full text-white duration-200 ease-in-out`}
    >
      <div className='flex items-center justify-center gap-1.5'>{label}</div>
    </button>
  );
}

export default CapsuleButton;
