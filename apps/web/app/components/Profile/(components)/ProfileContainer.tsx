import React from 'react';

export function ProfileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-fit !w-[245px] shrink-0 flex-col rounded-md p-5 shadow-custom'>
      {children}
    </div>
  );
}
