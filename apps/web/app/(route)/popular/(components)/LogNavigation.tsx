'use client';
import React from 'react';
import { Selectbox } from '@repo/ui/SelectBox';

interface LogNavigationProps {
  totalLogs: number;
  selectList: { value: string }[];
}

export default function LogNavigation({
  totalLogs,
  selectList,
}: LogNavigationProps) {
  return (
    <div className='mb-5 flex items-end justify-between'>
      <div className='text-B2R14 text-text-secondary'>총 {totalLogs}로그</div>
      <Selectbox width='short' selectList={selectList} onChange={() => {}} />
    </div>
  );
}
