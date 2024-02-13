import React from 'react';
import { FloatingButtons } from '@/components/FloatingButtons';
import CategoryButtonWrap from '@/components/Category/CategoryButtonWrap';
import PocketBase from 'pocketbase';
import { notFound } from 'next/navigation';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import LogNavigation from '../popular/(components)/LogNavigation';
import AddedLogCard from '../popular/(components)/AddedLogCard';

const categories = [
  { value: '전체' },
  { value: '김철수', id: '1' },
  { value: '이철수', id: '2' },
  { value: '박철수', id: '3' },
  { value: '최철수', id: '4' },
  { value: '강철수', id: '5' },
  { value: '김영희', id: '6' },
  { value: '이영희', id: '7' },
  { value: '박영희', id: '8' },
  { value: '최영희', id: '9' },
  { value: '강영희', id: '10' },
];

const selectList = [
  { value: '최신순' },
  { value: '인기순' },
  { value: '오래된순' },
];

const getFollwing = async () => {
  try {
    const session = await auth();
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const following = await pb
      .collection('following')
      .getFirstListItem(`userId="${session?.user.id}"`);
    return following.followingId;
  } catch (error) {
    return [];
  }
};

const fetchData = async (user: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    let logs;
    if (user === '전체') {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
      });
    } else {
      logs = await pb.collection('logs').getList(1, 6, {
        sort: '-likes',
        filter: `series="${user}"`,
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
  const user =
    typeof searchParams.user === 'string' ? searchParams.user : '전체';
  const follwing = await getFollwing();
  const { logs, totalLogs } = await fetchData(user);
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
        <AddedLogCard category={user} />
      </ul>
    </main>
  );
}

export default page;
