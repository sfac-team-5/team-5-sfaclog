import Image from 'next/image';
import { LogType } from '@/types';
import { CardTitle } from './(components)/CardTitle';
import { CardViews } from './(components)/CardViews';
import { CardLikes } from './(components)/CardLikes';

interface LogCardProps {
  log: LogType;
}

export function LogCardMore({ log }: LogCardProps) {
  const nickname = log.expand?.user?.nickname
    ? log.expand.user.nickname
    : '사용자명';

  return (
    <div className='border-brand-50 flex w-full justify-between border-t py-3'>
      <div className='size-[61px] overflow-hidden rounded-md'>
        {log.thumbnailUrl === '' ? (
          <div className='bg-background-5 size-full' />
        ) : (
          <Image
            src={log.thumbnailUrl}
            width={0}
            height={0}
            sizes='100%'
            className='size-full object-cover'
            alt='thumbnail'
          />
        )}
      </div>
      <div className='w-[calc(100%-61px-12px)]'>
        <div>
          <CardTitle title={log.title} />
        </div>
        <div className='mt-5 flex w-full justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-B3R12'>{nickname}</span>
          </div>
          <div className='flex gap-3'>
            <CardViews count={log.views} />
            <CardLikes count={log.likes} />
          </div>
        </div>
      </div>
    </div>
  );
}
