import React from 'react';
import MyLog from '../(compoenents)/MyLog';

function page({ params }: { params: { page: string } }) {
  const { page } = params;

  return <MyLog page={Number(page)} />;
}

export default page;
