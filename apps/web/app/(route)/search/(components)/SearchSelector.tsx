'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Selectbox } from '@repo/ui/SelectBox';
import { useSearchParams, useRouter } from 'next/navigation';
const selectList = [
  {
    value: '최신순',
  },
  { value: '인기순' },
];

interface SearchSelectorProps {
  query: string;
  logCnt: number;
  writerCnt: number;
}
export function SearchSelector({
  query,
  logCnt,
  writerCnt,
}: SearchSelectorProps) {
  const [sortParam, setSortParam] = useState('');
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'log';
  const router = useRouter();

  const handleSelectBox = (data: { value: string }) => {
    if (data.value === '최신순') {
      setSortParam(() => 'recently');
      router.push(`/search?query=${query}&tab=${tab}&sorted=recently`);
      router.refresh();
    } else if (data.value === '인기순') {
      setSortParam(() => 'popular');
      router.push(`/search?query=${query}&tab=${tab}&sorted=popular`);
      router.refresh();
    }
  };
  return (
    <div className='flex items-end justify-between'>
      <div className='flex gap-6'>
        <Link
          className={`${tab === 'log' ? 'text-text-point text-B1B16' : 'text-text-gray text-B1R16'}`}
          href={`/search?query=${query}&tab=log${sortParam && `&sorted=${sortParam}`}`}
        >
          로그({logCnt})
        </Link>
        <Link
          className={`${tab === 'writer' ? 'text-text-point text-B1B16' : 'text-text-gray text-B1R16'}`}
          href={`/search?query=${query}&tab=writer${sortParam && `&sorted=${sortParam}`}`}
        >
          작성자({writerCnt})
        </Link>
      </div>
      <div>
        <Selectbox
          width='short'
          onChange={handleSelectBox}
          selectList={selectList}
        />
      </div>
    </div>
  );
}
