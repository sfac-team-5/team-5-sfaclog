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
}

// 반응형 진행 시 사이즈별로 나뉠 수 있음
const btnSize = {
  s: 'w-[107px] h-[40px] text-B2M14',
  m: 'w-[146px] h-[40px] text-B2M14',
  l: 'w-[360px] h-[45px] text-B1M16',
};

function SNSButton({
  type,
  size,
  label,
  labelColor,
  bgColor,
  borderColor,
  disabled,
}: SNSButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${btnSize[size]} ${bgColor} ${labelColor} ${borderColor && `${borderColor} border`} rounded-[6px] duration-200 ease-in-out disabled:bg-neutral-10 disabled:text-neutral-30`}
    >
      <div className='flex items-center justify-center gap-1.5'>
        {/* 아이콘 */}
        <div className='size-5 rounded-full bg-red-400'></div>
        {label}
      </div>
    </button>
  );
}

export default SNSButton;
