import React from 'react';
import MyLogList from './MyLogList';
import MyPageCategory from '../../(components)/MyPageCategory';

interface MyLogProps {
  page: number;
  category: string;
  sort?: string;
}

async function MyLog({ page, category, sort }: MyLogProps) {
  return (
    <div className='size-full'>
      <h1 className='text-primary text-H1M24 mb-8'>나의 활동</h1>
      <MyPageCategory category={category} />
      <MyLogList page={page} sort={sort} />
    </div>
  );
}

export default MyLog;
