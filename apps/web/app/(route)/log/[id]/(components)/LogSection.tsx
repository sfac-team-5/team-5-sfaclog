import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PocketBase from 'pocketbase';
import { LogType } from '@/types';
import { Avatar } from '@/components/Avatar';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getList(1, 3, {
      sort: '-likes',
      expand: 'user',
    });
    return log.items;
  } catch (error) {
    return [];
  }
};

async function LogSection() {
  const log = await fetchData();
  return (
    <div className='shadow-custom flex h-fit !w-[245px] shrink-0 flex-col rounded-md px-5 py-6 pb-2'>
      <span className='text-B1B16 text-text-primary'>함께 보면 좋은 로그</span>
      <ul className='group'>
        {log.map((item: any) => {
          const title =
            item.title.length > 38
              ? item.title.substr(0, 38) + '...'
              : item.title;

          return (
            <li
              key={item.id}
              className='flex flex-col gap-[10px] border-b py-4 last:border-none'
            >
              <div className='text-B2R14 text-text-primary'>{title}</div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[6px]'>
                  {item.expand.user.avatar &&
                  item.expand.user.avatar.length > 0 ? (
                    <div className='relative size-5 overflow-hidden rounded-full'>
                      <Image
                        src={`${process.env.POCKETBASE_URL}/api/files/users/${item.expand.user.id}/${item.expand.user.avatar}`}
                        fill
                        objectFit='cover'
                        alt='avatar'
                      />
                    </div>
                  ) : (
                    <Avatar size={20} />
                  )}
                  <span className='text-B3R12'>
                    {item.expand.user.nickname}
                  </span>
                </div>
                <Link
                  href={`/log/${item.id}`}
                  className='text-B3R12 text-text-gray'
                >
                  자세히 보기
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LogSection;
