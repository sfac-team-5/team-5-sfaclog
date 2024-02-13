'use client';

import React from 'react';
import Button from '@repo/ui/Button';
import BookMarkButton from './ContentHeader/BookMarkButton';

interface ContentButtonProps {
  logId: string;
}

function ContentButton({ logId }: ContentButtonProps) {
  return (
    <div className='flex justify-center gap-2'>
      <Button type='button' size='m' label='목록으로' className='!w-[146px]' />
      <BookMarkButton logId={logId} />
    </div>
  );
}

export default ContentButton;
