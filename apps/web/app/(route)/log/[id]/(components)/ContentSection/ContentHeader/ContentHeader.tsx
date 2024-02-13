import React from 'react';
import ShareButton from './ShareButton';
import KebobMenu from './KebobMenu';
import { IconViewBlack } from '@repo/ui/Icon';
import ViewCounter from './ViewCounter';

interface ContentHeaderProps {
  log: any;
}

function ContentHeader({ log }: ContentHeaderProps) {
  return (
    <div>
      <p className='mb-5 text-B1B16 text-brand-90'>{log.series}</p>
      <div className='mb-4 flex w-full items-center justify-between'>
        <h2 className='text-H1M24'>{log.title}</h2>
        <div className='flex gap-3'>
          <ShareButton />
          <KebobMenu logId={log.id} />
        </div>
      </div>
      <div className='flex items-center border-b border-stroke-30 pb-4'>
        <span className='rounded-full bg-neutral-90 px-[10px] py-1 text-B3R12 text-text-white'>
          {log.isVisibility ? '공개' : '비공개'}
        </span>
        <span className='pl-3 pr-6 text-B2R14 text-text-gray'>
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
