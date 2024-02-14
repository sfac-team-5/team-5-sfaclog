import Spinner from '@/components/Spinner';
import React from 'react';

function loading() {
  return (
    <div className='fixed inset-0 z-[100] flex size-full items-center justify-center bg-black/40'>
      <Spinner />
    </div>
  );
}

export default loading;
