import React from 'react';
import MyLog from '../(compoenents)/MyLog';

function page({ params }: { params: { page: string } }) {
  const { page } = params;
  const CATEGORY = 'my-log';

  return <MyLog page={Number(page)} category={CATEGORY} />;
}

export default page;
