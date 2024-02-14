'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { LogCard } from '@/components/Card/LogCard';
import { LogType } from '@/types';
import Spinner from '@/components/Spinner';

interface AddedBookListProps {
  category: string;
  type?: 'popular' | 'recently';
}

export default function AddedLogCard({
  category = '전체',
  type = 'popular',
}: AddedBookListProps) {
  const [addeLogCard, setAddedLogCard] = useState<LogType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isObserver, setIsObserver] = useState(false);

  const triggerRef = useCallback(
    (node: any) => {
      if (!node) return;
      if (isLoading) return;
      if (isObserver) return;
      setIsObserver(true);
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
        await fetch(`/api/log-${type}?category=${category}&page=${page}`)
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
        setIsObserver(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    setAddedLogCard([]);
    setPage(1);
  }, [category]);

  return (
    <>
      {addeLogCard.map(log => (
        <LogCard variant='logPage' key={log.id} log={log} />
      ))}
      {isLoading && (
        <div className='fixed inset-0 z-[100] flex size-full items-center justify-center bg-black/40'>
          <Spinner />
        </div>
      )}
      <div ref={triggerRef} className='place-self-end'></div>
    </>
  );
}
