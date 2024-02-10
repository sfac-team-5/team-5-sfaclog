import { IconArrowLeftSmallGray } from '@public/svgs';
import Link from 'next/link';
import React from 'react';

interface PrevButtonProps {
  page: number;
  category: string;
}

function PrevButton({ page, category }: PrevButtonProps) {
  return (
    <Link href={`/mypage/${category}/${page - 1}`}>
      <button disabled={page === 1 ? true : false}>
        <IconArrowLeftSmallGray />
      </button>
    </Link>
  );
}

export default PrevButton;
