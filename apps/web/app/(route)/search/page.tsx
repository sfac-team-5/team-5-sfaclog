import React from 'react';
import { SearchSelector } from './(components)/SearchSelector';
import { SearchResult } from './(components)/SearchResult';
import { getSearchResult } from './action';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import { UserCard } from '@/components/Card/UserCard';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  //searchParams = { query: 'example', tab: 'log', sort: 'popular' }
  const data = await getSearchResult(searchParams);
  if (data.length === 0)
    return (
      <div className='mb-64 mt-40 flex justify-center'>
        <SearchResult query={searchParams.query || ''} resultCnt={0} />
      </div>
    );
  return (
    <section className='mx-auto my-10 w-[960px]'>
      <SearchResult
        query={searchParams.query || ''}
        resultCnt={data.logRecords.length + data.userRecords.length}
      />
      <SearchSelector
        query={searchParams.query || ''}
        logCnt={data.logRecords.length}
        userCnt={data.userRecords.length}
      />
      <div className='mt-5 flex gap-6'>
        {data &&
          (searchParams.tab == 'log' || searchParams.tab == undefined) &&
          data.logRecords.map((item: LogType, idx: number) => (
            <div className='basis-1/3' key={idx}>
              <LogCard variant='mainPage' log={item} />
            </div>
          ))}
        {data &&
          searchParams.tab == 'user' &&
          data.userRecords.map((item: any, idx: number) => (
            <div className='basis-1/3' key={idx}>
              <UserCard
                interests={item.interests}
                intro={item.intro}
                nickname={item.nickname}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
