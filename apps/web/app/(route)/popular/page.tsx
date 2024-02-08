import React from 'react';
import { Loading } from '@/components/Loading';
import { FloatingButtons } from '@/components/FloatingButtons';

function page() {
  return (
    <>
      <Loading />
      <FloatingButtons writeUrl='/log/write' />
    </>
  );
}

export default page;
