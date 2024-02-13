'use client';

import React from 'react';
import Image from 'next/image';
import { ReplyCommentType } from './LogComment';
import { formatDateToYMDHM } from '@/utils/formatDateToYMDHM';
import { IconReplyArrow } from '@public/svgs';
import { useRouter } from 'next/navigation';
import { useModalDataActions } from '@/hooks/stores/useModalDataStore';
import { useSession } from 'next-auth/react';
import { Avatar } from '@/components/Avatar';

interface ReplyCommentItemProps {
  item: ReplyCommentType;
  logId: string;
  userId: string;
  authorId: string;
}

function ReplyCommentItem({
  item,
  logId,
  userId,
  authorId,
}: ReplyCommentItemProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { onChange: changeModalData } = useModalDataActions();

  const onDelete = () => {
    changeModalData({
      type: 'reply-comment-delete',
      logId,
      commentId: item.id.toString(),
      userId: item.userId,
    });
    router.push(`/modal?type=reply-comment-delete`, {
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
              {item.userThumbnail.length === 0 ? (
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
                {formatDateToYMDHM(item.createAt)}
              </span>
            </div>
          </div>
          {session?.user.id === item.userId && (
            <button onClick={onDelete} className='text-B3R12 text-text-gray'>
              삭제하기
            </button>
          )}
        </div>
        <p className='text-B2R14 text-text-primary'>
          {item.publicScope
            ? item.text
            : item.userId === userId
              ? item.text
              : authorId === userId
                ? item.text
                : '비공개 댓글입니다.'}
        </p>
      </div>
    </li>
  );
}

export default ReplyCommentItem;
