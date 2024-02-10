'use client';

import { LogCard } from '@/components/Card/LogCard';
import React, { useEffect, useState } from 'react';
import { LogType } from '@/types';
import MyPagePagination from '@/components/Pagination/MyPagePagination';

interface RecentlyLogListProps {
  page: number;
}

function RecentlyLogList({ page }: RecentlyLogListProps) {
  const [recentlyLogs, setRecentlyLogs] = useState<LogType[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const recentlyData = localStorage.getItem('watch');
    const fetchData = async () => {
      const response = await fetch(
        `/api/recently-log?recently=${recentlyData}&page=${page}`,
      );
      if (!response.ok) return alert('데이터를 불러오는데 실패했습니다!');
      const { recentlyLogs, totalItems } = await response.json();
      setRecentlyLogs(recentlyLogs);
      setTotalItems(totalItems);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className='mb-10 grid grid-cols-2 gap-6'>
        {recentlyLogs?.map(log => (
          <LogCard variant='logPage' key={log.id} log={log} />
        ))}
      </div>
      <MyPagePagination
        totalItems={totalItems}
        page={page}
        category='recently-log'
      />
    </div>
  );
}

export default RecentlyLogList;
