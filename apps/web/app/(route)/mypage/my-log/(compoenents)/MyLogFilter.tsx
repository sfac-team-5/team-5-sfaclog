'use client';

import { Selectbox } from '@repo/ui/SelectBox';
import { useRouter } from 'next/navigation';
import React from 'react';

const selectList = [
  { value: '최신순', link: 'recently' },
  { value: '인기순', link: 'popular' },
  { value: '오래된순', link: 'oldest' },
];

function MyLogFilter() {
  const router = useRouter();
  const onChange = (list: { value: string; link: string }) => {
    router.push(`/mypage/my-log?sort=${list.link}`);
  };

  return (
    <div className='mb-5'>
      <Selectbox width='short' selectList={selectList} onChange={onChange} />
    </div>
  );
}

export default MyLogFilter;
