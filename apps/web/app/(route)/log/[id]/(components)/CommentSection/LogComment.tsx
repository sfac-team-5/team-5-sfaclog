import React from 'react';
import CommentItem from './CommentItem';
import ReplyCommentItem from './ReplyCommentItem';
import { auth } from '@/auth';

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
  authorId: string;
}

export async function LogComment({
  comment,
  replyComment,
  logId,
  authorId,
}: LogCommentProps) {
  const session = await auth();
  return (
    <ul className='border-neutral-10 border-t'>
      {comment?.map(item => (
        <>
          <CommentItem
            key={item.id}
            item={item}
            logId={logId}
            userId={session ? session.user.id : ''}
            authorId={authorId}
          />
          <ul className='bg-background-5'>
            {replyComment
              .filter(r => r.commentId === item.id)
              ?.map(reply => (
                <ReplyCommentItem
                  key={reply.id}
                  item={reply}
                  logId={logId}
                  userId={session ? session.user.id : ''}
                  authorId={authorId}
                />
              ))}
          </ul>
        </>
      ))}
    </ul>
  );
}
