import React from 'react';
import PocketBase from 'pocketbase';
import { Session } from 'next-auth';
import { auth } from '@/auth';
import MyPagePagination from '@/components/Pagination/MyPagePagination';
import MycommentFilter from './MycommentFilter';
import { MypageNotFound } from '../../(components)/MypageNotFound';
import MyCommentListItem from './MyCommentListItem';

interface MyCommentListProps {
  page: number;
  sort?: string;
}

// 제대로 짜려면 대공사가 필요해서 성능 신경안쓰고 작성했습니다..
const fetchData = async (
  session: Session | null,
  page: number,
  sort?: string,
) => {
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
    const sortedMyCommentList = myCommentList.sort((a, b) =>
      sort === 'recently'
        ? new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        : new Date(a.createAt).getTime() - new Date(b.createAt).getTime(),
    );

    const result = sortedMyCommentList.slice(6 * (page - 1), 6 * page);

    return { myCommentList: result, totalItems: sortedMyCommentList.length };
  } catch (error) {
    return { myCommentList: [], totalItems: 0 };
  }
};

async function MyCommentList({ page, sort }: MyCommentListProps) {
  const session = await auth();
  if (!session) return;
  const { myCommentList, totalItems } = await fetchData(session, page, sort);
  if (myCommentList.length === 0)
    return (
      <div className='mt-[170px] flex w-full justify-center'>
        <MypageNotFound
          title='아직 작성한 댓글이 없어요.'
          description='로그와 커뮤니티에서 댓글을 남겨 보세요.'
        />
      </div>
    );

  return (
    <div>
      <MycommentFilter />
      <ul className='mb-6'>
        {myCommentList.map((comment: any) => {
          return <MyCommentListItem key={comment.id} comment={comment} />;
        })}
      </ul>
      <MyPagePagination
        totalItems={totalItems}
        page={page}
        category='my-comment'
        sort={sort}
      />
    </div>
  );
}

export default MyCommentList;
