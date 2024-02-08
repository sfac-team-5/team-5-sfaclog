'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const myPageCategory = [
  {
    id: 101,
    title: '나의 로그',
    link: '/mypage',
  },
  {
    id: 102,
    title: '나의 커뮤니티',
    link: '/mypage/my-community',
  },
  {
    id: 103,
    title: '내가 쓴 댓글',
    link: '/mypage/my-comment',
  },
  {
    id: 104,
    title: '최근 본 로그',
    link: '/mypage/recently-log',
  },
  {
    id: 105,
    title: '최근 본 커뮤니티',
    link: '/mypage/recently-community',
  },
];

function MyPageCategory() {
  const pathname = usePathname();
  return (
    <div className='mb-[30px] flex gap-[25px]'>
      {myPageCategory.map(item => (
        <Link
          key={item.id}
          href={item.link}
          className={`${pathname === item.link ? 'text-B1B16 text-brand-90' : 'text-B1R16 text-neutral-40'}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default MyPageCategory;
