'use  client';

import React from 'react';

interface CapsuleButtonProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  size?: keyof typeof btnSize;
  color?: 'blue' | 'white';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const btnSize = {
  s: 'h-[32px] px-4',
  m: 'h-[36px] px-4',
  l: 'h-[40px] px-6',
};

function CapsuleButton({
  icon,
  label,
  size = 's',
  color = 'blue',
  disabled,
  onClick,
  className = '',
}: CapsuleButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} ${color === 'blue' ? 'bg-brand-70 hover:bg-brand-90 active:bg-brand-90 border-brand-70 hover:border-brand-90 text-white' : 'border-brand-70 text-brand-70 bg-white hover:border-[#4C8BFF] hover:bg-[#EFF3FA] active:bg-[#EFF3FA]'} text-B2M14 rounded-full border duration-200 ease-in-out ${className}`}
    >
      <div className='flex items-center justify-center gap-1.5'>
        {icon && icon}
        {label}
      </div>
    </button>
  );
}

export default CapsuleButton;
