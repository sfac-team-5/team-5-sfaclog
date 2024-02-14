import React from 'react';
import { Chip } from '@repo/ui/Chip';
export function PopularSearchTerms() {
  return (
    <div className='flex flex-col pt-2'>
      <div className='text-B1M16'>인기검색어</div>
      <div className='mt-3 flex w-56 flex-wrap gap-2'>
        <Chip>개발자</Chip>
        <Chip>js</Chip>
        <Chip>부트캠프</Chip>
        <Chip>Spring boot</Chip>
        <Chip>React</Chip>
        <Chip>Next.js</Chip>
      </div>
    </div>
  );
}
