import React from 'react';
import { IconArrowLeftSmallGray, IconArrowRightSmallGray } from '@public/svgs';
import FollowNumbering from './FollowNumbering';

interface FollowPaginationProps {
  totalItems: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleNumberPage: (number: number) => void;
}

function FollowPagination({
  totalItems,
  currentPage,
  handlePrevPage,
  handleNextPage,
  handleNumberPage,
}: FollowPaginationProps) {
  const 총페이지 = Math.ceil(totalItems / 10);

  return (
    <div className='flex items-center justify-center gap-4'>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={handlePrevPage}
      >
        <IconArrowLeftSmallGray />
      </button>
      <FollowNumbering
        currentPage={currentPage}
        총페이지={총페이지}
        handleNumberPage={handleNumberPage}
      />
      <button
        disabled={currentPage === 총페이지 ? true : false}
        onClick={handleNextPage}
      >
        <IconArrowRightSmallGray />
      </button>
    </div>
  );
}

export default FollowPagination;
