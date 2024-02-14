import { IconArrowLeftSmallGray } from '@public/svgs';
import Link from 'next/link';
import React from 'react';

interface PrevButtonProps {
  page: number;
  category: string;
  sort?: string;
}

function PrevButton({ page, category, sort }: PrevButtonProps) {
  return (
    <Link
      href={{
        pathname: `/mypage/${category}/${page - 1}`,
        query: sort ? { sort } : {},
      }}
      className='flex items-center'
    >
      <button disabled={page === 1 ? true : false}>
        <IconArrowLeftSmallGray />
      </button>
    </Link>
  );
}

export default PrevButton;
