import React from 'react';
import { FloatingButtons } from '@/components/FloatingButtons';
import CategoryButtonWrap from '@/components/Category/CategoryButtonWrap';
import PocketBase from 'pocketbase';
import { notFound } from 'next/navigation';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import LogNavigation from '../popular/(components)/LogNavigation';
import AddedLogCard from '../popular/(components)/AddedLogCard';

const categories = [
  { title: '전체' },
  { title: '프론트엔드' },
  { title: '백엔드' },
  { title: '데이터분석' },
  { title: '서버개발' },
  { title: 'DBA' },
  { title: 'IOS 개발' },
  { title: '안드로이드 개발' },
  { title: 'React' },
  { title: 'Typescript' },
  { title: 'Next' },
  { title: 'Pocketbae' },
  { title: 'Firebase' },
];

const fetchData = async (category: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (category === '전체') {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-created',
      });
    } else {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-created',
        filter: `series="${category}"`,
      });
    }

    logs.items.forEach(log => {
      const thumbnailFilename = log.thumbnail;
      log.thumbnailUrl = pb.files.getUrl(log, thumbnailFilename, {
        thumb: '300x300',
      });
    });
    return { logs: logs.items as LogType[], totalLogs: logs.totalItems };
  } catch (error) {
    return { logs: [], totalLogs: 0 };
  }
};

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : '전체';
  const { logs, totalLogs } = await fetchData(category);
  if (!logs) return notFound();

  return (
    <main className='container'>
      <FloatingButtons writeUrl='/log/write' />
      <CategoryButtonWrap
        type='button'
        categories={categories}
        pageType='recently'
      />
      <ul className='grid grid-cols-3 gap-6'>
        {logs.map((log: LogType) => (
          <LogCard variant='logPage' key={log.id} log={log}></LogCard>
        ))}
        <AddedLogCard category={category} type='recently' />
      </ul>
    </main>
  );
}

export default page;
