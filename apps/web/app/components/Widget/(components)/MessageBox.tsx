import { Avatar } from '@/components/Avatar';

interface MessageBoxProps {
  unread: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
import React, { Dispatch, SetStateAction } from 'react';

function MessageBox({ unread, onClick }: MessageBoxProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-6 py-3`}
      onClick={onClick}
    >
      <Avatar size={50} />
      <div className='flex flex-col gap-1.5'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1.5'>
            <p
              className={`text-neutral-70 ${unread ? 'text-B3B12' : 'text-B3M12'}`}
            >
              뜨감
            </p>
            {unread && (
              <div className='bg-brand-90 size-[5px] rounded-full'></div>
            )}
          </div>
          <div className='text-neutral-40 text-B5R10'>2시간 전</div>
        </div>
        <div
          className={`${unread ? 'text-B3M12 text-neutral-70' : 'text-B3R12 text-neutral-40'}`}
        >
          뜨거운 감자 님으로 부터 프로젝트 제안이 도착했어요!
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
