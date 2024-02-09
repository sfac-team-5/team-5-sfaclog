import React from 'react';
import MyPageCategory from '../(components)/MyPageCategory';
import MyCommunityList from './(components)/MyCommunityList';

function page() {
  return (
    <div className='size-full'>
      <h1 className='text-primary mb-8 text-H1M24'>나의 활동</h1>
      <MyPageCategory />
      <MyCommunityList />
    </div>
  );
}

export default page;
