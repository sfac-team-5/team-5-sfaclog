'use  client';

import React from 'react';

interface SNSButtonProps {
  type: 'submit' | 'button';
  size: keyof typeof btnSize;
  label: string;
  labelColor: string;
  bgColor: string;
  borderColor?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
}

// 반응형 진행 시 사이즈별로 나뉠 수 있음
const btnSize = {
  s: 'w-[107px] h-[40px] text-B2M14',
  m: 'w-[146px] h-[40px] text-B2M14',
  l: 'w-[400px] h-[45px] text-B1M16',
};

function SNSButton({
  type,
  size,
  label,
  labelColor,
  bgColor,
  borderColor,
  disabled,
  onClick,
  icon,
}: SNSButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} ${bgColor} ${labelColor} ${borderColor && `${borderColor} border`} disabled:bg-neutral-10 disabled:text-neutral-30 rounded-[6px] duration-200 ease-in-out`}
    >
      <div className='flex items-center justify-center gap-1.5'>
        {/* 아이콘 */}
        {icon}
        {label}
      </div>
    </button>
  );
}

export default SNSButton;
