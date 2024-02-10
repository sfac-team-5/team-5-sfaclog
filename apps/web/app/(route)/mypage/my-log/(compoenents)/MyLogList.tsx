import { auth } from '@/auth';
import { LogCard } from '@/components/Card/LogCard';
import { NoData } from '@/components/NoData';
import React from 'react';
import PocketBase from 'pocketbase';
import { LogType } from '@/types';
import { Session } from 'next-auth';
import MyPagePagination from '@/components/Pagination/MyPagePagination';

interface MyLogListProps {
  page: number;
}

const fetchData = async (session: Session | null, page: number) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const myLogs = await pb.collection('logs').getList<LogType>(page, 6, {
      expand: 'user',
      filter: `user="${session?.user.id}"`,
    });

    myLogs.items.forEach(log => {
      const thumbnailFilename = log.thumbnail;
      log.thumbnailUrl = pb.files.getUrl(log, thumbnailFilename, {
        thumb: '300x300',
      });
    });

    const { totalItems } = await pb
      .collection('logs')
      .getList(1, 1, { filter: `user="${session?.user.id}"` });

    return { myLogs: myLogs.items, totalItems };
  } catch (error) {
    return { myLogs: [], totalItems: 0 };
  }
};

async function MyLogList({ page }: MyLogListProps) {
  const session = await auth();
  if (!session) return;
  const { myLogs, totalItems } = await fetchData(session, page);
  if (myLogs.length === 0) return NoData();

  return (
    <div>
      <div className='mb-10 grid grid-cols-2 gap-6'>
        {myLogs.map(log => (
          <LogCard variant='logPage' key={log.collectionId} log={log} />
        ))}
      </div>
      <MyPagePagination
        totalItems={totalItems}
        page={page}
        category={'my-log'}
      />
    </div>
  );
}

export default MyLogList;
