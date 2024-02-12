import React from 'react';
import MyPageCategory from '../(components)/MyPageCategory';
import MyCommentList from './(components)/MyCommentList';

function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const PAGE = 1;
  const CATEGORY = 'my-comment';
  const sort =
    typeof searchParams.sort === 'string' ? searchParams.sort : 'recently';

  return (
    <div className='size-full'>
      <h1 className='text-primary mb-8 text-H1M24'>나의 활동</h1>
      <MyPageCategory category={CATEGORY} />
      <MyCommentList page={PAGE} sort={sort} />
    </div>
  );
}

export default page;
