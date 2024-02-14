'use client';
import { useState } from 'react';

import { Tabs } from '@repo/ui/Tabs';
import { NoData } from './NoData';
import { WidgetHeader } from './WidgetHeader';
import MessageBox from './(components)/MessageBox';
import { MessageChat } from './(components)/MessageChat';

interface MessageWidgetProps {
  onClose: () => void;
}

export function MessageWidget({ onClose }: MessageWidgetProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tabClasses =
    'ui-selected:font-bold ui-selected:border-b-2 ui-selected:border-neutral-90 border-neutral-30 flex h-[64px] w-1/3 cursor-pointer items-center justify-center border-b-[1px] px-[24px] py-[10px] text-[16px] outline-none duration-200 ease-in-out';

  return (
    <div className='absolute right-0 z-[2] mt-4 h-[720px] w-[360px] overflow-hidden rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <WidgetHeader type={'메시지'} onClose={onClose} />

      {/* <NoData type='메시지' /> */}
      <Tabs defaultSelectedTabIndex={0}>
        <div className={tabClasses}>프로젝트</div>
        <div className={tabClasses}>채용</div>
        <div className={tabClasses}>의견</div>
      </Tabs>

      <div className='scrollbar-hide h-[calc(100%-89px-64px)] overflow-auto scroll-smooth'>
        <MessageBox unread={true} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={true} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
        <MessageBox unread={false} onClick={() => setIsChatOpen(true)} />
      </div>

      <MessageChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
}
