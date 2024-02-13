'use client';

import React from 'react';
import Button from '@repo/ui/Button';
import BookMarkButton from './ContentHeader/BookMarkButton';
import { useRouter } from 'next/navigation';

interface ContentButtonProps {
  logId: string;
}

function ContentButton({ logId }: ContentButtonProps) {
  const router = useRouter();

  return (
    <div className='flex justify-center gap-2'>
      <Button
        onClick={() => {
          router.push('/popular');
        }}
        type='button'
        size='m'
        label='목록으로'
        className='!w-[146px]'
      />
      <BookMarkButton logId={logId} />
    </div>
  );
}

export default ContentButton;
