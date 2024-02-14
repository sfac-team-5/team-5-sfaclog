import PocketBase from 'pocketbase';

import { SectionHeader } from '@/components/SectionHeader';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import { NoData } from '@/components/NoData';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const logs = await pb.collection('logs').getList(1, 6, {
      sort: '-likes',
      expand: 'user',
    });
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

async function PopularLogs() {
  const popularLogs = await fetchData();
  if (popularLogs.logs.length === 0) return NoData();

  return (
    <div className='container mt-[60px] flex flex-col gap-8'>
      <SectionHeader title='인기 로그' more='/popular' />
      <div className='grid grid-cols-3 items-start gap-6'>
        {popularLogs.logs.map((log: LogType) => (
          <LogCard variant='mainPage' key={log.collectionId} log={log} />
        ))}
      </div>
    </div>
  );
}

export default PopularLogs;
