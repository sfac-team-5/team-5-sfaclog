'use client';
import { IconCancelBlack } from '@repo/ui/Icon';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRecordStore } from '@/hooks/stores/useSearchRecordStore';

export function RecentSearches({ onClose }: { onClose: () => void }) {
  const { records, deleteAllRecord, deleteRecord } = useRecordStore();
  const [isRemove, setIsRemove] = useState<number | undefined>(undefined);
  const [removeAll, setRemoveAll] = useState(false);
  const router = useRouter();

  const handleRemoveAll = () => {
    setRemoveAll(prev => !prev);
    setTimeout(() => {
      deleteAllRecord();
    }, 500);
  };

  const handleSearchByRecord = (word: string) => {
    router.push(`/search?query=${word}`);
    router.refresh();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='flex justify-between'>
        <div className='text-B1M16 text-text-primary'>최근검색어</div>
        <div
          className='text-text-gray text-B5R10 cursor-pointer'
          onClick={handleRemoveAll}
        >
          모두지우기
        </div>
      </div>
      <div className='mt-[10px] flex flex-wrap items-center gap-2'>
        {records &&
          records.map((word, idx) => {
            const handleRemove = () => {
              //지울 때 트랜지션 추가
              setIsRemove(() => idx);
              setTimeout(() => {
                setIsRemove(() => undefined);
                deleteRecord(word);
              }, 300);
            };
            return (
              <div
                className={`border-neutral-10 flex h-6 w-fit cursor-pointer items-center gap-2 rounded-md border-[1px] px-2 py-1 transition-opacity duration-300 ease-in-out ${removeAll ? 'opacity-0' : isRemove === idx ? 'opacity-0' : '!duration-0'}`}
                key={idx}
              >
                <div
                  onClick={() => handleSearchByRecord(word)}
                  className='text-B4R12 text-text-secondary'
                >
                  {word}
                </div>
                <div onClick={handleRemove}>
                  <IconCancelBlack className='stroke-neutral-40 size-[10px]' />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
