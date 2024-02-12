import React from 'react';

export function ProfileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='shadow-custom flex h-fit !w-[245px] flex-col rounded-md p-5'>
      {children}
    </div>
  );
}
