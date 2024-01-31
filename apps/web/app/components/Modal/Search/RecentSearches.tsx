'use client';
import { IconCancelBlack } from '@repo/ui/Icon';
import React, { useState } from 'react';
const recent = [
  '부트캠프1',
  '부트캠프2',
  '부트캠프3',
  '부트캠프4',
  '부트캠프5',
  '부트캠프6',
  '부트캠프7',
  '부트캠프8',
  '부트캠프9',
];

export function RecentSearches() {
  const [record, setRecord] = useState(recent);
  const [isRemove, setIsRemove] = useState<number | undefined>(undefined);
  const [removeAll, setRemoveAll] = useState(false);
  const handleRemoveAll = () => {
    setRemoveAll(prev => !prev);
    setTimeout(() => {
      setRecord(() => []);
    }, 500);
  };

  return (
    <div className='w-[400px]'>
      <div className='flex justify-between'>
        <div className='text-B1M16 text-text-primary'>최근검색어</div>
        <div
          className='text-text-gray cursor-pointer text-[10px] '
          onClick={handleRemoveAll}
        >
          모두지우기
        </div>
      </div>
      <div className='mt-[10px] flex flex-wrap items-center gap-2'>
        {record.map((word, idx) => {
          const handleRemove = () => {
            //지울 때 트랜지션 추가
            setIsRemove(() => idx);
            setTimeout(() => {
              setIsRemove(() => undefined);
              setRecord(prev => prev.filter((el, index) => idx !== index));
            }, 300);
          };
          return (
            <div
              className={`flex cursor-pointer items-center gap-[1px] transition-opacity duration-300 ease-in-out ${removeAll ? 'opacity-0' : isRemove === idx ? 'opacity-0' : '!duration-0'}`}
              key={idx}
              onClick={handleRemove}
            >
              <span className='text-B3R12'>{word}</span>
              <IconCancelBlack className='stroke-neutral-40 size-[10px]' />
            </div>
          );
        })}
      </div>
    </div>
  );
}
