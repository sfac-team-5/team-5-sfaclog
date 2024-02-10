import React from 'react';
import MyLog from './my-log/(compoenents)/MyLog';

async function MyPage() {
  const PAGE = 1;
  return <MyLog page={PAGE} />;
}

export default MyPage;
