'use client';

import { useModalDataActions } from '@/hooks/stores/useModalStore';
import { IconCancelBlack } from '@repo/ui/Icon';
import { useRouter } from 'next/navigation';
import React from 'react';

interface MyCommentDeleteButtonProps {
  logId: string;
  commentId: number;
  userId: string;
  type: string;
}

function MyCommentDeleteButton({
  logId,
  commentId,
  userId,
  type,
}: MyCommentDeleteButtonProps) {
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

  const onClick = (logId: string, commentId: string, userId: string) => {
    changeModalData({
      title: '삭제하기',
      description: '이 댓글을 삭제하시겠습니까?',
      action: async () => {
        const response = await fetch(
          type
            ? `/api/log/reply-comment/${logId}`
            : `/api/log/comment/${logId}`,
          {
            method: 'DELETE',
            body: JSON.stringify({ commentId, userId }),
          },
        );
        if (!response.ok) return alert('삭제 실패요 ㅜㅜ');
        router.back();
        router.refresh();
      },
    });
    router.push(`/modal`, {
      scroll: false,
    });
  };

  return (
    <button
      className='absolute right-3 top-3'
      onClick={() => onClick(logId, commentId.toString(), userId)}
    >
      <div className='size-4'>
        <IconCancelBlack />
      </div>
    </button>
  );
}

export default MyCommentDeleteButton;
