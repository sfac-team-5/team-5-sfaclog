'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { ReplyCommentType } from './LogComment';
import { IconReplyArrow } from '@public/svgs';
import { useModalDataActions } from '@/hooks/stores/useModalStore';
import { Avatar } from '@/components/Avatar';
import { formatCommentDate } from '@/utils/formatUtils';

interface ReplyCommentItemProps {
  item: ReplyCommentType;
  logId: string;
  userId: string;
  authorId: string;
}

function ReplyCommentItem({
  item,
  logId,
  userId: currentUserId,
  authorId,
}: ReplyCommentItemProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { onChange: changeModalData } = useModalDataActions();
  const { id, userId } = item;

  const onDelete = (logId: string, commentId: string, userId: string) => {
    changeModalData({
      title: '삭제하기',
      description: '이 댓글을 삭제하시겠습니까?',
      action: async () => {
        const response = await fetch(`/api/log/reply-comment/${logId}`, {
          method: 'DELETE',
          body: JSON.stringify({ commentId, userId }),
        });
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
    <li className='border-neutral-10 border-b'>
      <div className='flex flex-col gap-3 px-5 py-6'>
        <div className='flex justify-between'>
          <div className='flex items-start'>
            <IconReplyArrow className='mr-[10px]' />
            <div className='flex items-center'>
              {!item.userThumbnail || item.userThumbnail?.length === 0 ? (
                <Avatar size={30} />
              ) : (
                <div className='relative size-6 overflow-hidden rounded-full'>
                  <Image
                    src={item.userThumbnail || ''}
                    fill
                    objectFit='cover'
                    alt='avatar'
                  />
                </div>
              )}
              <span className='text-B2B14 text-text-primary pl-2 pr-3'>
                {item.userName}
              </span>
              <span className='text-B3R12 text-text-gray'>
                {formatCommentDate(item.createAt)}
              </span>
            </div>
          </div>
          {session?.user.id === item.userId && (
            <button
              onClick={() => onDelete(logId, id.toString(), userId)}
              className='text-B3R12 text-text-gray'
            >
              삭제하기
            </button>
          )}
        </div>
        <p className='text-B2R14 text-text-primary'>
          {item.publicScope
            ? item.text
            : item.userId === currentUserId
              ? item.text
              : authorId === currentUserId
                ? item.text
                : '비공개 댓글입니다.'}
        </p>
      </div>
    </li>
  );
}

export default ReplyCommentItem;
