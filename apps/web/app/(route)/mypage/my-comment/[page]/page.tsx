import React from 'react';
import MyPageCategory from '../../(components)/MyPageCategory';
import MyCommentList from '../(components)/MyCommentList';

function page({ params }: { params: { page: string } }) {
  const { page } = params;
  const CATEGORY = 'my-comment';

  return (
    <div className='size-full'>
      <h1 className='text-primary mb-8 text-H1M24'>나의 활동</h1>
      <MyPageCategory category={CATEGORY} />
      <MyCommentList page={Number(page)} />
    </div>
  );
}

export default page;