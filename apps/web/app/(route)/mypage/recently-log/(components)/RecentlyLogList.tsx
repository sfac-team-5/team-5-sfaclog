'use client';

import { LogCard } from '@/components/Card/LogCard';
import React, { useEffect, useState } from 'react';
import { LogType } from '@/types';

function RecentlyLogList() {
  const [recentlyLogs, setRecentlyLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const recentlyData = localStorage.getItem('watch');
    const fetchData = async () => {
      const response = await fetch(
        `/api/recently-log?recently=${recentlyData}`,
      );
      if (!response.ok) return alert('데이터를 불러오는데 실패했습니다!');
      const result = await response.json();
      setRecentlyLogs(result);
    };
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-2 gap-6'>
      {recentlyLogs.map(log => (
        <LogCard variant='logPage' key={log.collectionId} log={log} />
      ))}
    </div>
  );
}

export default RecentlyLogList;
