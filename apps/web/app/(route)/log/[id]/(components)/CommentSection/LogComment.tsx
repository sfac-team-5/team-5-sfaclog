import React from 'react';
import CommentItem from './CommentItem';
import ReplyCommentItem from './ReplyCommentItem';

export interface CommentType {
  createAt: string;
  id: number;
  publicScope: true;
  text: string;
  userId: string;
  userName: string;
  userThumbnail: string;
}

export interface ReplyCommentType {
  createAt: string;
  id: number;
  commentId: number;
  publicScope: true;
  text: string;
  userId: string;
  userName: string;
  userThumbnail: string;
}

interface LogCommentProps {
  comment: CommentType[];
  replyComment: ReplyCommentType[];
  logId: string;
}

export function LogComment({ comment, replyComment, logId }: LogCommentProps) {
  return (
    <ul className='border-t border-neutral-10'>
      {comment?.map(item => (
        <>
          <CommentItem key={item.id} item={item} logId={logId} />
          <ul className='bg-background-5'>
            {replyComment
              .filter(r => r.commentId === item.id)
              ?.map(reply => (
                <ReplyCommentItem key={reply.id} item={reply} logId={logId} />
              ))}
          </ul>
        </>
      ))}
    </ul>
  );
}
