'use  client';

import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  size: keyof typeof btnSize;
  label: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
}

const btnSize = {
  s: 'w-[107px] h-[40px] text-B2M14',
  m: 'w-[146px] h-[40px] text-B2M14',
  l: 'w-[400px] h-[50px] text-B1B16',
};

function Button({ type, size, label, disabled, onClick, icon }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} bg-brand-70 hover:bg-brand-90 active:bg-brand-90 disabled:bg-neutral-10 disabled:text-neutral-30 rounded-[6px] text-white duration-200 ease-in-out`}
    >
      <div className='flex items-center justify-center gap-1.5'>
        <span>{label}</span>
        {icon && icon}
      </div>
    </button>
  );
}

export default Button;
