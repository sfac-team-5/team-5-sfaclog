import React from 'react';
import { IconHeartBlack } from '@repo/ui/Icon';
import ContentHeader from './ContentHeader';
import ContentThumbnail from './ContentThumbnail';
import ContentButton from './ContentButton';
import ContentArea from './ContentArea';

interface ContentSectionProps {
  log: any;
}

function ContentSection({ log }: ContentSectionProps) {
  return (
    <div className='w-full'>
      <ContentHeader log={log} />
      <div className='border-stroke-30 space-y-[41px] border-b py-10'>
        <ContentThumbnail logId={log.id} logThumbnail={log.thumbnail} />
        <ContentArea logContent={log.content} />

        <div className='flex items-center justify-between'>
          <ul className='flex gap-[6px]'>
            {log.tags.map((tag: string, i: number) => (
              <li
                key={i}
                className='text-B3R12 text-neutral-70 bg-tag-tag rounded-full px-3 py-[10px]'
              >
                #{tag}
              </li>
            ))}
          </ul>
          <div className='flex cursor-pointer gap-1 rounded-full border px-4 py-[10px]'>
            <span className='size-4'>
              <IconHeartBlack />
            </span>
            <span className='text-B3R12 text-neutral-70'>
              {log.likes.lenght > 999 ? '999+' : log.likes}
            </span>
          </div>
        </div>
        <ContentButton />
      </div>
    </div>
  );
}

export default ContentSection;
