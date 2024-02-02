import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import { NoData } from '@/components/NoData';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function PopularLogs() {
  const popularLogs = await fetchData();
  if (popularLogs.length === 0) return NoData();

  return (
    <div className='container mt-[72px] flex flex-col gap-8'>
      <SectionHeader title='인기 로그' more='/popular' />
      <div className='grid w-full grid-cols-3 gap-6'>
        {popularLogs.map((log: LogType) => {
          return <LogCard key={log.collectionId} log={log} />;
        })}
      </div>
    </div>
  );
}

export default PopularLogs;
