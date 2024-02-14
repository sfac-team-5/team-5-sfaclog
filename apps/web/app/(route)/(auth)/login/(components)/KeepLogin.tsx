import React, { useState } from 'react';
import { IconRadioBoxBlue, IconRadioBoxGray } from '@repo/ui/Icon';

export function KeepLogin() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className='flex cursor-pointer items-center gap-1'>
      {isChecked && <IconRadioBoxBlue className='size-5' />}
      {!isChecked && <IconRadioBoxGray className='size-5' />}
      <input
        type='checkbox'
        className='hidden'
        onChange={() => setIsChecked(prev => !prev)}
      />
      <span className='text-B3R12 text-text-secondary'>로그인 유지</span>
    </label>
  );
}
