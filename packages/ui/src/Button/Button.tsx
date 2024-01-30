'use  client';

import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  size: keyof typeof btnSize;
  label: string;
  disabled?: boolean;
}

const btnSize = {
  s: 'w-[107px] h-[40px] text-B2M14',
  m: 'w-[146px] h-[40px] text-B2M14',
  l: 'w-[360px] h-[50px] text-B1B16',
};

function Button({ type, size, label, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${btnSize[size]} rounded-[6px] bg-brand-70 text-white duration-200 ease-in-out hover:bg-brand-90 active:bg-brand-90 disabled:bg-neutral-10 disabled:text-neutral-30`}
    >
      {label}
    </button>
  );
}

export default Button;
