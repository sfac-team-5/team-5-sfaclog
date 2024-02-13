import React from 'react';
import { LogComment } from './LogComment';
import PocketBase from 'pocketbase';
import CommentInput from './CommentInput';

interface CommentSectionProps {
  logId: string;
  authorId: string;
}

const fetchData = async (id: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const comments = await pb
      .collection('comments')
      .getFirstListItem(`log="${id}"`);

    const replyComments = await pb
      .collection('replyComments')
      .getFirstListItem(`log="${id}"`);

    return { comment: comments.comment, replyComment: replyComments.comment };
  } catch (error) {
    return {};
  }
};

async function CommentSection({ logId, authorId }: CommentSectionProps) {
  const { comment, replyComment } = await fetchData(logId);

  return (
    <div>
      <div className='space-y-5 px-5 pb-8 pt-7'>
        <span>댓글({comment ? comment.length + replyComment.length : 0})</span>
        <CommentInput logId={logId} />
      </div>
      {comment && (
        <LogComment
          comment={comment}
          replyComment={replyComment}
          logId={logId}
          authorId={authorId}
        />
      )}
    </div>
  );
}

export default CommentSection;
