import React from 'react';
import NotFound from '../../../not-found';
import { SectionHeader } from '@/components/SectionHeader';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function PopularLogs() {
  const popularLogs = await fetchData();
  if (popularLogs.length === 0) return NotFound();

  const masonry = [[], [], []];

  popularLogs.forEach((log: LogType, idx: number) => {
    masonry[idx % 3]?.push(log);
  });

  return (
    <div className='container mt-[72px] flex flex-col gap-8'>
      <SectionHeader title='인기 로그' more='/popular' />
      <div className='grid grid-cols-3 items-start gap-6'>
        {masonry.map((column, columnIndex) => (
          <div key={columnIndex} className='grid gap-4'>
            {column.map((log: LogType) => (
              <LogCard
                key={log.collectionId}
                log={log}
                more={getRandom(0, 2)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularLogs;
