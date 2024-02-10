import React from 'react';
import MyLog from './my-log/(compoenents)/MyLog';

async function MyPage() {
  const PAGE = 1;
  const CATEGORY = 'my-log';

  return <MyLog page={PAGE} category={CATEGORY} />;
}

export default MyPage;
