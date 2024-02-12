import React from 'react';
import { FloatingButtons } from '@/components/FloatingButtons';
import CategoryButtonWrap from '@/components/Category/CategoryButtonWrap';
import PocketBase from 'pocketbase';
import { notFound } from 'next/navigation';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import { revalidatePath } from 'next/cache';
import LogNavigation from '../popular/(components)/LogNavigation';
import AddedLogCard from '../popular/(components)/AddedLogCard';

const categories = [
  { title: '전체' },
  { title: '김철수', id: '1' },
  { title: '이철수', id: '2' },
  { title: '박철수', id: '3' },
  { title: '최철수', id: '4' },
  { title: '강철수', id: '5' },
  { title: '김영희', id: '6' },
  { title: '이영희', id: '7' },
  { title: '박영희', id: '8' },
  { title: '최영희', id: '9' },
  { title: '강영희', id: '10' },
];

const selectList = [
  { value: '최신순' },
  { value: '인기순' },
  { value: '오레된순' },
];

const fetchData = async (category: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (category === '전체') {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
      });
    } else {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
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
      <CategoryButtonWrap type='following' list={categories} />
      <LogNavigation totalLogs={totalLogs} selectList={selectList} />
      <ul className='grid grid-cols-3 gap-6'>
        {logs.map((log: LogType) => (
          <LogCard variant='logPage' key={log.id} log={log}></LogCard>
        ))}
        <AddedLogCard category={category} />
      </ul>
    </main>
  );
}

export default page;
