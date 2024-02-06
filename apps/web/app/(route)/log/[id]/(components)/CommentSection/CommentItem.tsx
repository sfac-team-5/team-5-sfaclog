'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CommentType } from './LogComment';
import { formatDateToYMDHM } from '@/utils/formatDateToYMDHM';
import ReplyCommentInput from './ReplyCommentInput';

interface CommentItemProps {
  item: CommentType;
  logId: string;
}

function CommentItem({ item, logId }: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className='border-b border-neutral-10'>
      <div className='flex flex-col gap-3 px-5 py-6'>
        <div className='flex justify-between'>
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
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className='text-B3R12 text-text-gray'
          >
            답글달기
          </button>
        </div>
        <p className='text-B2R14 text-text-primary'>
          {item.publicScope ? item.text : '비공개 댓글입니다.'}
        </p>
      </div>

      {isOpen && <ReplyCommentInput logId={logId} commentId={item.id} />}
    </li>
  );
}

export default CommentItem;
