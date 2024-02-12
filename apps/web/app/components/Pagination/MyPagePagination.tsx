import React from 'react';
import Numbering from './Numbering';
import PrevButton from './PrevButton';
import NextButton from './NextButton';

interface MyPagePaginationProps {
  totalItems: number;
  page: number;
  category: string;
  sort?: string;
}

function MyPagePagination({
  totalItems,
  page,
  category,
  sort,
}: MyPagePaginationProps) {
  const 총페이지 = Math.ceil(totalItems / 6);

  return (
    <div className='flex items-center justify-center gap-4'>
      <PrevButton page={page} category={category} sort={sort} />
      <Numbering
        page={page}
        category={category}
        총페이지={총페이지}
        sort={sort}
      />
      <NextButton
        page={page}
        category={category}
        총페이지={총페이지}
        sort={sort}
      />
    </div>
  );
}

export default MyPagePagination;
