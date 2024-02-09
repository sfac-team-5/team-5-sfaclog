'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';

interface AddedBookListProps {
  category: string;
}

export default function AddedLogCard({ category }: AddedBookListProps) {
  const [addeLogCard, setAddedLogCard] = useState<LogType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const triggerRef = useCallback(
    (node: any) => {
      if (!node) return;
      if (isLoading) return;

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setPage(prev => prev + 1);
              observer.disconnect();
            }
          });
        },
        { threshold: 1 },
      );

      observer.observe(node);
    },
    [addeLogCard],
  );

  useEffect(() => {
    if (page === 1) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetch(`/api/log-popular?category=${category}&page=${page}`)
          .then(res => res.json())
          .then(result => {
            if (result.length === 0) return;
            setAddedLogCard(prev => [...prev, ...result]);
          });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      {addeLogCard.map(log => (
        <LogCard variant='logPage' key={log.id} log={log} />
      ))}
      {isLoading && (
        <div className='fixed bottom-8 left-0 flex w-full justify-center'>
          로딩중...
        </div>
      )}
      <div ref={triggerRef} className='size-4 place-self-end bg-red-900'></div>
    </>
  );
}
