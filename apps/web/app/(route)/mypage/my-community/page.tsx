import React from 'react';
import MyPageCategory from '../(components)/MyPageCategory';
import MyCommunityList from './(components)/MyCommunityList';

function page() {
  const CATEGORY = 'my-community';

  return (
    <div className='size-full'>
      <h1 className='text-primary mb-8 text-H1M24'>나의 활동</h1>
      <MyPageCategory category={CATEGORY} />
      <MyCommunityList />
    </div>
  );
}

export default page;
