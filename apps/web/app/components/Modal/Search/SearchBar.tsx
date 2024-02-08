import { IconSearch } from '@repo/ui/Icon';
import React from 'react';

export function SearchBar() {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search'
        className='border-stroke-50 placeholder:text-B1B16 text-text-primary text-B2R14 h-[35px] w-[400px] border-b-2 pl-1 outline-none placeholder:text-blue-600'
      />
      <div className='bg-brand-90 absolute -top-1 right-2 flex cursor-pointer items-center justify-center rounded-full p-[6px]'>
        <IconSearch className=' size-5 fill-white' />
      </div>
    </div>
  );
}
