import React from 'react';

export function NavSearch() {
  return (
    <div className='mx-5 hidden sm:block md:block lg:block'>
      <input type='text' className='outline-none' placeholder='검색' />
    </div>
  );
}
