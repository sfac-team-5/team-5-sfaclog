'use client';

import React from 'react';
import Image from 'next/image';
import { ReplyCommentType } from './LogComment';
import { formatDateToYMDHM } from '@/utils/formatDateToYMDHM';
import { IconReplyArrow } from '@public/svgs';
import { useRouter } from 'next/navigation';
import { useModalDataActions } from '@/hooks/stores/useModalDataStore';

interface ReplyCommentItemProps {
  item: ReplyCommentType;
  logId: string;
}

function ReplyCommentItem({ item, logId }: ReplyCommentItemProps) {
  const router = useRouter();
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
    <li className='border-b border-neutral-10'>
      <div className='flex flex-col gap-3 px-5 py-6'>
        <div className='flex justify-between'>
          <div className='flex items-start'>
            <IconReplyArrow className='mr-[10px]' />
            <div className='flex items-center'>
              <div className='relative size-6 overflow-hidden rounded-full'>
                <Image
                  src={item.userThumbnail || ''}
                  fill
                  objectFit='cover'
                  alt='avatar'
                />
              </div>
              <span className='pl-2 pr-3 text-B2B14 text-text-primary'>
                {item.userName}
              </span>
              <span className='text-B3R12 text-text-gray'>
                {formatDateToYMDHM(item.createAt)}
              </span>
            </div>
          </div>
          <button onClick={onDelete} className='text-B3R12 text-text-gray'>
            삭제하기
          </button>
        </div>
        <p className='text-B2R14 text-text-primary'>
          {item.publicScope ? item.text : '비공개 댓글입니다.'}
        </p>
      </div>
    </li>
  );
}

export default ReplyCommentItem;
