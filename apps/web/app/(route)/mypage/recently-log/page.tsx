import React from 'react';
import MyPageCategory from '../(components)/MyPageCategory';
import RecentlyLogList from './(components)/RecentlyLogList';

function page() {
  const PAGE = 1;
  const CATEGORY = 'recently-log';

  return (
    <div className='size-full'>
      <h1 className='text-primary mb-8 text-H1M24'>나의 활동</h1>
      <MyPageCategory category={CATEGORY} />
      <RecentlyLogList page={PAGE} />
    </div>
  );
}

export default page;
