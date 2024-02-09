import { auth } from '@/auth';
import { LogCard } from '@/components/Card/LogCard';
import { NoData } from '@/components/NoData';
import React from 'react';
import PocketBase from 'pocketbase';
import { LogType } from '@/types';
import { Session } from 'next-auth';

const fetchData = async (session: Session | null) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const myLogs = await pb.collection('logs').getFullList({
      expand: 'user',
      filter: `user="${session?.user.id}"`,
    });

    myLogs.forEach(log => {
      const thumbnailFilename = log.thumbnail;
      log.thumbnailUrl = pb.files.getUrl(log, thumbnailFilename, {
        thumb: '300x300',
      });
    });
    return myLogs as LogType[];
  } catch (error) {
    return [];
  }
};

async function MyLogList() {
  const session = await auth();
  if (!session) return;
  const myLog = await fetchData(session);
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
