'use client';

import { Selectbox } from '@repo/ui/SelectBox';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const selectList = [
  { value: '최신순', link: 'recently' },
  { value: '오래된순', link: 'oldest' },
];

function MycommentFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  let index = 0;
  if (sort === 'recenty') {
    index = 0;
  } else if (sort === 'oldest') {
    index = 1;
  }

  const onChange = (list: { value: string; link: string }) => {
    router.push(`/mypage/my-comment?sort=${list.link}`);
  };

  return (
    <div className='mb-5'>
      <Selectbox
        width='short'
        selectList={selectList}
        onChange={onChange}
        defaultValueIndex={index}
      />
    </div>
  );
}

export default MycommentFilter;
