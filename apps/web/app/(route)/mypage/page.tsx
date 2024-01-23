import React from 'react';
import { handleGetToken } from '../../utils/auth';
import { headers, cookies } from 'next/headers';
function MyPage() {
  const headerData = handleGetToken();

  return <div>{JSON.stringify(headerData)}</div>;
}

export default MyPage;
