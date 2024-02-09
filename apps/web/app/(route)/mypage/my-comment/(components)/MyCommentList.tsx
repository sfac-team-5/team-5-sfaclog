import React from 'react';
import PocketBase from 'pocketbase';
import { auth } from '@/auth';
import { NoData } from '@/components/NoData';
import { formatDateToYMDHM } from '@/utils/formatDateToYMDHM';
import { IconComment, IconReplyArrow } from '@public/svgs';
import MyCommentDeleteButton from './MyCommentDeleteButton';
import { Session } from 'next-auth';
import CommentCount from './CommentCount';

// 제대로 짜려면 대공사가 필요해서 성능 신경안쓰고 작성했습니다..
const fetchData = async (session: Session | null) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const commentList = await pb
      .collection('comments')
      .getFullList({ expand: 'log' });

    const replyCommentList = await pb
      .collection('replyComments')
      .getFullList({ expand: 'log' });

    const filteredCommentList: any = [];
    commentList.forEach(comments => {
      comments.comment.forEach(
        (item: any) => (
          (item.logId = comments.expand?.log.id),
          (item.logTitle = comments.expand?.log.title)
        ),
      );

      comments.comment.length !== 0 &&
        filteredCommentList.push(
          ...comments.comment.filter(
            (item: any) => item.userId === session?.user.id,
          ),
        );
    });

    const filteredReplyCommentList: any = [];
    replyCommentList.forEach(replyComments => {
      replyComments.comment.forEach(
        (item: any) => (
          (item.logId = replyComments.expand?.log.id),
          (item.logTitle = replyComments.expand?.log.title)
        ),
      );

      replyComments.comment.length !== 0 &&
        filteredReplyCommentList.push(
          ...replyComments.comment.filter(
            (item: any) => item.userId === session?.user.id,
          ),
        );
    });

    const myCommentList = [...filteredCommentList, ...filteredReplyCommentList];
    const sortedMyCommentList = myCommentList.sort(
      (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    );

    return sortedMyCommentList;
  } catch (error) {
    return [];
  }
};

async function MyCommentList() {
  const session = await auth();
  if (!session) return;
  const myCommentList = await fetchData(session);
  if (myCommentList.length === 0) return NoData();

  return (
    <div>
      {myCommentList.map((comment: any) => {
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
        );
      })}
    </div>
  );
}

export default MyCommentList;
