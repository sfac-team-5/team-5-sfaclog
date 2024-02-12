import React from 'react';
import { SearchSelector } from './(components)/SearchSelector';
import { SearchResult } from './(components)/SearchResult';
import { getSearchResult } from './action';
import { MypageNotFound } from '../mypage/(components)/MypageNotFound';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  //searchParams = { query: 'example', tab: 'log', sort: 'popular' }
  //   console.log(searchParams);
  const data = await getSearchResult(searchParams);
  console.log('page =', data);
  if (data.length === 0)
    return (
      <div className='my-10 flex justify-center'>
        <MypageNotFound
          title='검색 결과가 존재하지 않습니다'
          description='임시용 삭제되거나 변경예정'
        />
      </div>
    );
  return (
    <section className='mx-auto my-10 w-[960px]'>
      <SearchResult query={searchParams.query || ''} resultCnt={data.length} />
      <SearchSelector
        query={searchParams.query || ''}
        logCnt={data.length}
        writerCnt={0}
      />
      <div className='mt-5 flex gap-6'>
        {data &&
          data.map((item: LogType, idx: number) => (
            <div className='basis-1/3' key={idx}>
              <LogCard variant='mainPage' log={item} />
            </div>
          ))}
      </div>
    </section>
  );
}
