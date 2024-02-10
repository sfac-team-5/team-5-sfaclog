import { IconArrowRightSmallGray } from '@public/svgs';
import Link from 'next/link';
import React from 'react';

interface NextButtonProps {
  총페이지: number;
  page: number;
  category: string;
}

function NextButton({ 총페이지, page, category }: NextButtonProps) {
  return (
    <Link
      href={`/mypage/${category}/${page + 1}`}
      className='flex items-center'
    >
      <button disabled={page === 총페이지 ? true : false}>
        <IconArrowRightSmallGray />
      </button>
    </Link>
  );
}

export default NextButton;
