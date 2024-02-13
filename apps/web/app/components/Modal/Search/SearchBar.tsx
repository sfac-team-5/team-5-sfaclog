'use client';
import { IconSearch } from '@repo/ui/Icon';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecordStore } from '@/hooks/stores/useSearchRecordStore';
export function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { updateRecord } = useRecordStore();
  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
    updateRecord(query);
    router.push(`/search?query=${query}`);
  };
  return (
    <form className='relative' onSubmit={handleSearchSubmit}>
      <input
        onChange={e => setQuery(e.target.value)}
        type='text'
        placeholder='Search'
        className='border-stroke-50 placeholder:text-B1B16 text-text-primary text-B2R14 h-[35px] w-[400px] border-b-2 pl-1 outline-none placeholder:text-blue-600'
      />
      <button
        type='submit'
        className='bg-brand-90 absolute -top-1 right-2 flex cursor-pointer items-center justify-center rounded-full p-[6px]'
      >
        <IconSearch className=' size-5 fill-white' />
      </button>
    </form>
  );
}
