import React from 'react';

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-tag-tag text-text-primary text-B3R12 flex h-6 w-max items-center justify-center rounded-[20px] px-[10px] py-[5px]'>
      {children}
    </div>
  );
}
