import React from 'react';
import Numbering from './Numbering';
import PrevButton from './PrevButton';
import NextButton from './NextButton';

interface MyPagePaginationProps {
  totalItems: number;
  page: number;
  category: string;
}

function MyPagePagination({
  totalItems,
  page,
  category,
}: MyPagePaginationProps) {
  const 총페이지 = Math.ceil(totalItems / 6);

  return (
    <div className='flex items-center justify-center gap-4'>
      <PrevButton page={page} category={category} />
      <Numbering page={page} category={category} 총페이지={총페이지} />
      <NextButton page={page} category={category} 총페이지={총페이지} />
    </div>
  );
}

export default MyPagePagination;
