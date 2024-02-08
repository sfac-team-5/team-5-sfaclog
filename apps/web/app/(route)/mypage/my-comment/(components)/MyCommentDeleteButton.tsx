'use client';

import { useModalDataActions } from '@/hooks/stores/useModalDataStore';
import { IconCancelBlack } from '@repo/ui/Icon';
import { useRouter } from 'next/navigation';
import React from 'react';

interface MyCommentDeleteButtonProps {
  logId: string;
  commentId: number;
  userId: string;
}

function MyCommentDeleteButton({
  logId,
  commentId,
  userId,
}: MyCommentDeleteButtonProps) {
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

  const onClick = () => {
    changeModalData({
      type: 'comment-delete',
      logId,
      commentId: commentId.toString(),
      userId,
    });
    router.push(`/modal?type=comment-delete`, {
      scroll: false,
    });
  };

  return (
    <button className='absolute right-3 top-3' onClick={onClick}>
      <div className='size-4'>
        <IconCancelBlack />
      </div>
    </button>
  );
}

export default MyCommentDeleteButton;
