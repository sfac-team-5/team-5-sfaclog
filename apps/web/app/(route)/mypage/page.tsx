import React from 'react';
import MyLog from './my-log/(compoenents)/MyLog';

async function MyPage() {
  const PAGE = 1;
  const CATEGORY = 'my-log';
  const sort = 'recently';

  return (
    <div className='w-[632px]'>
      <MyLog page={PAGE} category={CATEGORY} sort={sort} />
    </div>
  );
}

export default MyPage;
