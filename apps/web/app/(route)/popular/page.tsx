import React from 'react';
import { FloatingButtons } from '@/components/FloatingButtons';
import CategoryButtonWrap from '@/components/Category/CategoryButtonWrap';
import PocketBase from 'pocketbase';
import { notFound } from 'next/navigation';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import AddedLogCard from './(components)/AddedLogCard';

const categories = [
  { title: '전체' },
  { title: '카테고리2' },
  { title: '카테고리3' },
  { title: '카테고리4' },
  { title: '카테고리5' },
  { title: '카테고리6' },
  { title: '카테고리7' },
  { title: '카테고리8' },
  { title: '카테고리9' },
  { title: '카테고리10' },
  { title: '카테고리11' },
  { title: '카테고리12' },
  { title: '카테고리13' },
  { title: '카테고리14' },
  { title: '카테고리15' },
];

const fetchData = async (category: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (category === '전체') {
      logs = await pb.collection('logs').getList(1, 3, {
        sort: '-likes',
      });
    } else {
      logs = await pb.collection('logs').getList(1, 3, {
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
    return logs.items as LogType[];
  } catch (error) {
    return [];
  }
};

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : '전체';
  const logs = await fetchData(category);
  if (!logs) return notFound();

  return (
    <main className='container'>
      <FloatingButtons writeUrl='/log/write' />
      <CategoryButtonWrap type='button' categories={categories} />
      <ul className='mt-10 grid grid-cols-3 gap-6'>
        {logs.map((log: LogType) => (
          <LogCard variant='logPage' key={log.id} log={log}></LogCard>
        ))}
        <AddedLogCard category={category} />
      </ul>
    </main>
  );
}

export default page;
