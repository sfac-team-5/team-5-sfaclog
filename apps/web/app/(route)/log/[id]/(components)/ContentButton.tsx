'use client';

import React from 'react';
import Button from '@repo/ui/Button';
import { IconBookmarkGray } from '@public/svgs';

function ContentButton() {
  return (
    <div className='flex justify-center gap-2'>
      <Button type='button' size='m' label='목록으로' />
      <button className='border-neutral-10 rounded-[6px] border p-2'>
        <IconBookmarkGray />
      </button>
    </div>
  );
}

export default ContentButton;
