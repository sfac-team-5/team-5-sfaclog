import getChunk from '@/utils/getChunk';
import Link from 'next/link';
import React from 'react';

interface NumberingProps {
  총페이지: number;
  page: number;
  category: string;
}

function Numbering({ 총페이지, page, category }: NumberingProps) {
  const 총페이지배열 = Array.from({ length: 총페이지 }).map((_, i) => (
    <Link
      key={i}
      href={`/mypage/${category}/${i + 1}`}
      className='cursor-pointer'
    >
      <div
        className={`${page === i + 1 ? 'border-brand-90 text-brand-90' : 'border-transparent text-text-primary'} flex size-[21px] items-center justify-center rounded-[6px] border text-B2R14 `}
      >
        {i + 1}
      </div>
    </Link>
  ));
  const 배열을나누는숫자 = 5;
  const 쪼개진총페이지배열 = getChunk(총페이지배열, 배열을나누는숫자);
  const 순서 = Math.floor((page - 1) / 배열을나누는숫자);

  return (
    <div className='flex items-center gap-4'>{쪼개진총페이지배열[순서]}</div>
  );
}

export default Numbering;
