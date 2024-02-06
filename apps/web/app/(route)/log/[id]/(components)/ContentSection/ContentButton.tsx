'use client';

import React from 'react';
import Button from '@repo/ui/Button';
import { IconBookmarkGray } from '@public/svgs';

function ContentButton() {
  return (
    <div className='flex justify-center gap-2'>
      <Button type='button' size='m' label='목록으로' />
      <button className='rounded-[6px] border border-neutral-10 p-2'>
        <IconBookmarkGray />
      </button>
    </div>
  );
}

export default ContentButton;
