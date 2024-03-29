import React from 'react';
import { notFound } from 'next/navigation';
import PocketBase from 'pocketbase';
import { revalidatePath } from 'next/cache';

import { FloatingButtons } from '@/components/FloatingButtons';
import CategoryButtonWrap from '@/components/Category/CategoryButtonWrap';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import AddedLogCard from './(components)/AddedLogCard';
import LogNavigation from './(components)/LogNavigation';
import { logCategories } from '@/constants';

const selectList = [
  { value: '오늘' },
  { value: '이번 주' },
  { value: '이번 달' },
  { value: '올해' },
  { value: '전체' },
];

const fetchData = async (category: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (category === '전체') {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
        expand: 'user',
      });
    } else {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
        expand: 'user',
        filter: `series="${category}"`,
      });
    }

    logs.items.forEach(log => {
      const thumbnailFilename = log.thumbnail;
      log.thumbnailUrl = pb.files.getUrl(log, thumbnailFilename, {
        thumb: '300x300',
      });
    });
    revalidatePath('/popular');
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
      <CategoryButtonWrap type='category' list={logCategories} />
      <LogNavigation totalLogs={totalLogs} selectList={selectList} />
      <ul className='mb-6 grid grid-cols-3 gap-6'>
        {logs.map((log: LogType) => (
          <LogCard variant='logPage' key={log.id} log={log}></LogCard>
        ))}
        <AddedLogCard category={category} />
      </ul>
    </main>
  );
}

export default page;
