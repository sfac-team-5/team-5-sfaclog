import PocketBase from 'pocketbase';

import { NoData } from '@/components/NoData';

async function fetchData() {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const records = await pb.collection('logs').getFullList({
      sort: '-created',
      expand: 'user,series',
    });

    // 썸네일 URL 추가
    records.forEach(record => {
      const thumbnailFilename = record.thumbnail;
      record.thumbnailUrl = pb.files.getUrl(record, thumbnailFilename, {
        thumb: '300x300',
      });
    });

    return records;
  } catch (error) {
    return [];
  }
}

async function RecentlyLogs() {
  const recentlyLogs = await fetchData();
  if (recentlyLogs.length === 0) return NoData();

  return <div>RecentlyLogs</div>;
}

export default RecentlyLogs;
