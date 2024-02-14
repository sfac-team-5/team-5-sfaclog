import React from 'react';
import MyLog from '../(compoenents)/MyLog';

function page({
  params,
  searchParams,
}: {
  params: {
    page: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = params;
  const sort =
    typeof searchParams.sort === 'string' ? searchParams.sort : 'recently';
  const CATEGORY = 'my-log';

  return <MyLog page={Number(page)} category={CATEGORY} sort={sort} />;
}

export default page;
