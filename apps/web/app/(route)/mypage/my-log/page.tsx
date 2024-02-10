import React from 'react';
import MyLog from './(compoenents)/MyLog';

function page() {
  const PAGE = 1;
  const CATEGORY = 'my-log';

  return <MyLog page={PAGE} category={CATEGORY} />;
}

export default page;
