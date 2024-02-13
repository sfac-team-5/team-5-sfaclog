import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfileLogsProps {
  id: string;
  title: string;
  imageUrl: string;
  updated: string;
}

export function UserProfileLogs({
  userLogs,
}: {
  userLogs: UserProfileLogsProps[];
}) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <span className='text-B1B16 text-text-primary'>작성한 글</span>
        <Link href={'#'}>
          <span className='text-B3R12 text-text-gray'>더보기</span>
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        {userLogs.map((log: UserProfileLogsProps, idx: number) => {
          const title =
            log.title.length > 15 ? log.title.substr(0, 12) + '...' : log.title;

          return (
            <Link href={`/log/${log.id}`} key={idx} className='flex gap-[10px]'>
              <Image
                src={log.imageUrl || 'https://placehold.co/40x40/png'}
                alt='logImage'
                width={40}
                height={40}
                className='rounded-md'
              />
              <div className='flex flex-col'>
                <div className='text-B2R14 text-text-primary truncate'>
                  {title}
                </div>
                <div className='text-B3R12 text-text-secondary'>
                  {log.updated.slice(0, 10)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
