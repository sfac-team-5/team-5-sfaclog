'use client';

import { formatCommentDate } from '@/utils/formatUtils';
import Link from 'next/link';
import React from 'react';
import MyCommentDeleteButton from './MyCommentDeleteButton';
import { IconComment, IconReplyArrow } from '@public/svgs';
import CommentCount from './CommentCount';
import { useRouter } from 'next/navigation';

interface MyCommentListItemProps {
  comment: any;
}

function MyCommentListItem({ comment }: MyCommentListItemProps) {
  const router = useRouter();

  return (
    <li className='mb-6 cursor-pointer overflow-hidden rounded-[6px] shadow-custom last:mb-0'>
      <div
        onClick={() => router.push(`/log/${comment.logId}`)}
        className='w-full'
      >
        <div className='relative flex h-[110px] flex-col items-start justify-center bg-white pl-[64px] pr-[40px]'>
          <p className='mb-[9px] text-B1M16 text-text-primary'>
            {comment.text}
          </p>
          <p className='text-neutral-40'>
            {formatCommentDate(comment.createAt)}
          </p>
          <MyCommentDeleteButton
            logId={comment.logId}
            commentId={comment.id}
            userId={comment.userId}
            type={comment.commentId}
          />
        </div>
        <div className='flex h-[53px] items-center bg-tag-tag pl-[64px]'>
          <IconReplyArrow className='mr-3' />
          <p className='mr-2 text-B2R14 text-text-primary'>
            [원문] {comment.logTitle}
          </p>
          <IconComment className='mr-[3px]' />
          <CommentCount logId={comment.logId} />
        </div>
      </div>
    </li>
  );
}

export default MyCommentListItem;
