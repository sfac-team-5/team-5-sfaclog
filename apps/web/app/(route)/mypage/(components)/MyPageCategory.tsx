import React from 'react';
import Link from 'next/link';

interface MyPageCategoryProps {
  category: string;
}

const myPageCategory = [
  {
    id: 101,
    title: '나의 로그',
    categoryName: 'my-log',
  },
  {
    id: 102,
    title: '나의 커뮤니티',
    categoryName: 'my-community',
  },
  {
    id: 103,
    title: '내가 쓴 댓글',
    categoryName: 'my-comment',
  },
  {
    id: 104,
    title: '최근 본 로그',
    categoryName: 'recently-log',
  },
  {
    id: 105,
    title: '최근 본 커뮤니티',
    categoryName: 'recently-community',
  },
];

function MyPageCategory({ category }: MyPageCategoryProps) {
  return (
    <div className='mb-[30px] flex gap-[25px]'>
      {myPageCategory.map(item => (
        <Link
          key={item.id}
          href={`/mypage/${item.categoryName}`}
          className={`${item.categoryName === category ? 'text-B1B16 text-brand-90' : 'text-B1R16 text-neutral-40'}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default MyPageCategory;
