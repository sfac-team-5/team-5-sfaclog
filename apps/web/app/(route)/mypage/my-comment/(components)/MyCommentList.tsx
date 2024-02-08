import React from 'react';
import PocketBase from 'pocketbase';
import { auth } from '@/auth';
import { NoData } from '@/components/NoData';
import { CommentType } from '@/(route)/log/[id]/(components)/CommentSection/LogComment';
import { formatDateToYMDHM } from '@/utils/formatDateToYMDHM';
import { IconComment, IconReplyArrow } from '@public/svgs';
import MyCommentDeleteButton from './MyCommentDeleteButton';

const fetchData = async (userId?: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const comments = await pb
      .collection('comments')
      .getFirstListItem(`log="adufowmt2hsfubh"`);

    // const replyComments = await pb
    //   .collection('replyComments')
    //   .getFirstListItem(`log="${userId}"`);

    return { myCommentList: comments.comment, logId: comments.log };
  } catch (error) {
    return {};
  }
};

async function MyCommentList() {
  const session = await auth();
  if (!session) return;
  const { myCommentList, logId } = await fetchData(session?.user.id);
  if (myCommentList.length === 0) return NoData();

  return (
    <div>
      {myCommentList.map((comment: CommentType) => {
        return (
          <div
            key={comment.id}
            className='mb-6 w-full overflow-hidden rounded-[6px] shadow-custom last:mb-0'
          >
            <div className='relative flex h-[110px] flex-col items-start justify-center bg-white pl-[64px] pr-[40px]'>
              <p className='mb-[9px] text-B1M16 text-text-primary'>
                {comment.text}
              </p>
              <p className='text-neutral-40'>
                {formatDateToYMDHM(comment.createAt)}
              </p>
              <MyCommentDeleteButton
                logId={logId}
                commentId={comment.id}
                userId={comment.userId}
              />
            </div>
            <div className='flex h-[53px] items-center bg-tag-tag pl-[64px]'>
              <IconReplyArrow className='mr-3' />
              <p className='mr-2 text-B2R14 text-text-primary'>
                [원문] API 좀 작성해주세요😓
              </p>
              <IconComment className='mr-[3px]' />
              <span className='text-B3R12'>20</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyCommentList;
