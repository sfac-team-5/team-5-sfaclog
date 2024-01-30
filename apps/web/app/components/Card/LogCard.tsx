import Image from 'next/image';
import { CardBox } from './(components)/CardBox';
import { CardCategory } from './(components)/CardCategory';
import { CardTitle } from './(components)/CardTitle';
import { Avatar } from '../Avatar';
import { CardViews } from './(components)/CardViews';
import { CardLikes } from './(components)/CardLikes';

interface LogCardProps {
  log?: any;
}

export function LogCard({ log }: LogCardProps) {
  console.log(log.expand);
  return (
    <CardBox>
      <div className='size-[280px] overflow-hidden rounded-md'>
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
      <div className='w-full'>
        <div>
          <CardCategory category={log.series} />
        </div>
        <CardTitle title={log.title} />
        <div className='flex w-full justify-between'>
          <div className='flex'>
            <Avatar />
            <span>{log.expand.user.nickname}</span>
          </div>
          <div className='flex gap-3'>
            <CardViews count={log.views} />
            <CardLikes count={log.likes} />
          </div>
        </div>
      </div>
    </CardBox>
  );
}
