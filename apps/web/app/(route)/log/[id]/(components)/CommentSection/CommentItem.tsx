'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CommentType } from './LogComment';
import ReplyCommentInput from './ReplyCommentInput';
import { Avatar } from '@/components/Avatar';
import { formatCommentDate } from '@/utils/formatUtils';

interface CommentItemProps {
  item: CommentType;
  logId: string;
  userId: string;
  authorId: string;
}

function CommentItem({ item, logId, userId, authorId }: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(item);

  return (
    <li className='border-neutral-10 border-b'>
      <div className='flex flex-col gap-3 px-5 py-6'>
        <div className='flex justify-between'>
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
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className='text-B3R12 text-text-gray'
          >
            답글달기
          </button>
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

      {isOpen && <ReplyCommentInput logId={logId} commentId={item.id} />}
    </li>
  );
}

export default CommentItem;
