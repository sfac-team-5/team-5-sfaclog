import getChunk from '@/utils/getChunk';
import React from 'react';

interface NumberingProps {
  총페이지: number;
  currentPage: number;
  handleNumberPage: (number: number) => void;
}

function FollowNumbering({
  총페이지,
  currentPage,
  handleNumberPage,
}: NumberingProps) {
  const 총페이지배열 = Array.from({ length: 총페이지 }).map((_, i) => (
    <button
      key={i}
      className='cursor-pointer'
      onClick={() => handleNumberPage(i + 1)}
    >
      <div
        className={`${currentPage === i + 1 ? 'border-brand-90 text-brand-90' : 'text-text-primary border-transparent'} text-B2R14 flex size-[21px] items-center justify-center rounded-[6px] border `}
      >
        {i + 1}
      </div>
    </button>
  ));
  const 배열을나누는숫자 = 5;
  const 쪼개진총페이지배열 = getChunk(총페이지배열, 배열을나누는숫자);
  const 순서 = Math.floor((currentPage - 1) / 배열을나누는숫자);

  return (
    <div className='flex items-center gap-4'>{쪼개진총페이지배열[순서]}</div>
  );
}

export default FollowNumbering;
