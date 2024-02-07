'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export function PrevPageButton() {
  const router = useRouter();

  return (
    <button
      className='bg-brand-70 text-B2M14 h-10 w-[200px] rounded-md text-white'
      onClick={() => router.back()}
    >
      이전 페이지로 돌아가기
    </button>
  );
}
