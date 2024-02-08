import { auth } from '@/auth';
import { LogCard } from '@/components/Card/LogCard';
import { NoData } from '@/components/NoData';
import React from 'react';
import PocketBase from 'pocketbase';
import { LogType } from '@/types';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const logs = await pb.collection('logs').getList(1, 3, {
      sort: '-likes',
    });

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

async function MyLogList() {
  const session = await auth();
  if (!session) return;
  const myLog = await fetchData();
  if (myLog.length === 0) return NoData();

  return (
    <div className='grid grid-cols-2 gap-6'>
      {myLog.map(log => (
        <LogCard variant='logPage' key={log.collectionId} log={log} />
      ))}
    </div>
  );
}

export default MyLogList;
