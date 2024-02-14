'use  client';

import React from 'react';

interface GhostButtonProps {
  type: 'submit' | 'button';
  size: keyof typeof btnSize;
  label: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  className?: string;
}

const btnSize = {
  s: 'h-[30px] text-B3M12',
  m: 'h-[40px] text-B2M14',
  l: 'h-[50px] text-B1B16',
};

function GhostButton({
  type,
  size,
  label,
  disabled,
  onClick,
  icon,
  className,
}: GhostButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} w-full ${className} rounded-[6px] border border-brand-70 bg-white text-brand-70`}
    >
      <div className='flex items-center justify-center gap-1.5'>
        <span>{label}</span>
        {icon && icon}
      </div>
    </button>
  );
}

export default GhostButton;
