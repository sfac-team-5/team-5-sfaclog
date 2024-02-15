'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProfileFlwFlwerProps {
  userId: string;
  followerCount?: number;
}

export function ProfileFlwFlwer({
  userId,
  followerCount,
}: ProfileFlwFlwerProps) {
  const [count, setCount] = useState({
    follow: 0,
    follower: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/follow-count?userId=${userId}`);
      if (!response.ok) return alert('팔로우 정보를 불러오는데 실패했습니다!');
      const result = await response.json();
      setCount(result);
    };
    fetchData();
  }, [userId, followerCount]);

  return (
    <Link
      href={'/mypage/follow'}
      className='relative flex h-[53px] w-full rounded-md bg-brand-5'
    >
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{count.follow}</div>
        <div className='text-B5R10 text-neutral-50'>팔로우</div>
      </div>
      <div className='absolute left-1/2 top-[10px] h-[33px] w-[1px] rounded-md bg-brand-30' />
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{count.follower}</div>
        <div className='text-B5R10 text-neutral-50'>팔로워</div>
      </div>
    </Link>
  );
}
