import React from 'react';
import MyLog from './(compoenents)/MyLog';

function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const PAGE = 1;
  const CATEGORY = 'my-log';
  const sort =
    typeof searchParams.sort === 'string' ? searchParams.sort : 'recently';

  return <MyLog page={PAGE} category={CATEGORY} sort={sort} />;
}

export default page;
