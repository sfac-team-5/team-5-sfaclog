'use client';
import React, { useEffect, useState } from 'react';

import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import MyPagePagination from '@/components/Pagination/MyPagePagination';
import RecentlyLogFilter from './RecentlyLogFilter';
import { MypageNotFound } from '../../(components)/MypageNotFound';

interface RecentlyLogListProps {
  page: number;
  sort?: string;
}

function RecentlyLogList({ page, sort }: RecentlyLogListProps) {
  const [recentlyLogs, setRecentlyLogs] = useState<LogType[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const recentlyData = localStorage.getItem('watch');
    const fetchData = async () => {
      const response = await fetch(
        `/api/recently-log?recently=${recentlyData}&page=${page}&sort=${sort}`,
      );
      if (!response.ok) return alert('데이터를 불러오는데 실패했습니다!');
      const { recentlyLogs, totalItems } = await response.json();
      setRecentlyLogs(recentlyLogs);
      setTotalItems(totalItems);
    };
    fetchData();
  }, [page, sort]);

  if (recentlyLogs.length === 0)
    return (
      <div className='mt-[170px] flex w-full justify-center'>
        <MypageNotFound
          title='최근 본 로그가 없어요.'
          description='최신 로그에서 다양한 로그들을 살펴보세요.'
          buttonLabel='최신 로그 바로가기'
          href='/recently'
        />
      </div>
    );

  return (
    <div>
      <RecentlyLogFilter />
      <div className='mb-10 grid grid-cols-2 gap-6'>
        {recentlyLogs?.map(log => (
          <LogCard variant='logPage' key={log.id} log={log} />
        ))}
      </div>
      <MyPagePagination
        totalItems={totalItems}
        page={page}
        category='recently-log'
        sort={sort}
      />
    </div>
  );
}

export default RecentlyLogList;
