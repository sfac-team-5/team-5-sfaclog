import { IconSearch } from '@public/svgs';
import React from 'react';

export function NavSearch() {
  return (
    <div className='group '>
      <button className='group-hover:border-primary-50 rounded-full border-[1px] border-transparent p-[6px] duration-100 ease-in-out'>
        <IconSearch className='fill-neutral-90 group-hover:fill-primary-90 ' />
      </button>
    </div>
  );
}
