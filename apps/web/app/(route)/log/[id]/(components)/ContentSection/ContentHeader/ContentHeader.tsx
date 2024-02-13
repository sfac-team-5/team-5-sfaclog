import React from 'react';
import ShareButton from './ShareButton';
import KebobMenu from './KebobMenu';
import { IconViewBlack } from '@repo/ui/Icon';
import ViewCounter from './ViewCounter';
import { auth } from '@/auth';

interface ContentHeaderProps {
  log: any;
}

async function ContentHeader({ log }: ContentHeaderProps) {
  const session = await auth();
  return (
    <div>
      <p className='text-B1B16 text-brand-90 mb-5'>{log.series}</p>
      <div className='mb-4 flex w-full items-center justify-between'>
        <h2 className='text-H1M24'>{log.title}</h2>
        <div className='flex gap-3'>
          <ShareButton />
          {log.expand.user.id === session?.user.id && (
            <KebobMenu logId={log.id} />
          )}
        </div>
      </div>
      <div className='border-stroke-30 flex items-center border-b pb-4'>
        <span className='bg-neutral-90 text-B3R12 text-text-white rounded-full px-[10px] py-1'>
          {log.isVisibility ? '공개' : '비공개'}
        </span>
        <span className='text-B2R14 text-text-gray pl-3 pr-6'>
          {log.created.substr(0, 10)}
        </span>
        <div className='flex items-center gap-[6px]'>
          <span className='w-[18px]'>
            <IconViewBlack />
          </span>
          <ViewCounter logId={log.id} />
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
