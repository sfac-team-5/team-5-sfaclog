import { IconSearch } from '@repo/ui/Icon';
import React from 'react';

export function SearchBar() {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search'
        className='border-stroke-50 placeholder:text-B1B16 h-[35px] w-[400px] border-b-2 pl-1 outline-none'
      />
      <div className='absolute right-2 top-1 cursor-pointer'>
        <IconSearch />
      </div>
    </div>
  );
}
