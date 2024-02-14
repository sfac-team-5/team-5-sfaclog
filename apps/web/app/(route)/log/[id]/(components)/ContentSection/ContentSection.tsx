import React from 'react';
import ContentHeader from './ContentHeader/ContentHeader';
import ContentThumbnail from './ContentThumbnail';
import ContentButton from './ContentButton';
import ContentArea from './ContentArea';
import HeartButton from './HeartButton';

interface ContentSectionProps {
  log: any;
  userId: string;
}

function ContentSection({ log, userId }: ContentSectionProps) {
  const isPublic =
    log.isVisibility || (!log.isVisibility && userId === log.expand.user.id);
  return (
    <div className='w-full'>
      <ContentHeader log={log} />
      <div className='border-stroke-30 space-y-[41px] border-b py-10'>
        {isPublic ? (
          <>
            {log.thumbnail && (
              <ContentThumbnail logId={log.id} logThumbnail={log.thumbnail} />
            )}
            <ContentArea logContent={log.content} />
          </>
        ) : (
          <div className='py-10 text-center'>비공개 로그입니다.</div>
        )}

        <div className='flex items-center justify-between'>
          <ul className='flex gap-[6px]'>
            {log.tags.map((tag: string, i: number) => (
              <li
                key={i}
                className='bg-tag-tag text-B3R12 text-neutral-70 rounded-full px-3 py-[10px]'
              >
                #{tag}
              </li>
            ))}
          </ul>
          <HeartButton logId={log.id} />
        </div>
        <ContentButton logId={log.id} />
      </div>
    </div>
  );
}

export default ContentSection;
