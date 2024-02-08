import { Dispatch, SetStateAction, useState } from 'react';

import { IconArrowLeftBlack, IconKebabBlack } from '@repo/ui/Icon';
import { Avatar } from '../../Avatar';
import { MessageChatForm } from './MessageChatForm';
import { MessageDate } from './MessageDate';
import { MessageOffer } from './MessageOffer';
import { MessageBubble } from './MessageBubble';
import { MessageDialog } from './MessageDialog';

interface MessageChatProps {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
}

export function MessageChat({ isChatOpen, setIsChatOpen }: MessageChatProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      className={`absolute top-0 size-full rounded-md bg-white ${isChatOpen ? 'left-0' : 'left-full'} transition-all duration-300`}
    >
      <div className='border-neutral-10 flex items-center justify-between border-b px-5 py-3.5'>
        <IconArrowLeftBlack
          className='cursor-pointer'
          onClick={() => setIsChatOpen(false)}
        />
        <div className='flex items-center gap-2.5'>
          <Avatar size='xs' />
          <span className='text-B2B14 text-neutral-90'>Name</span>
        </div>
        <div className=''>
          <IconKebabBlack
            className='cursor-pointer'
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          />

          <MessageDialog isDialogOpen={isDialogOpen} />
        </div>
      </div>

      <div className='scrollbar-hide flex h-[calc(100%-54px-68px)] w-full flex-col overflow-auto scroll-smooth px-6'>
        <MessageDate date='23.10.10' />
        <MessageOffer type='incoming' />
        <MessageBubble type='outgoing' message='제안 수락' />
        <MessageBubble type='incoming' message='답장합니다. 안녕하세요' />
        <MessageDate date='23.10.10' />
        <MessageBubble type='outgoing' message='제안 수락' />
        <MessageBubble type='incoming' message='답장합니다. 안녕하세요' />
        <MessageBubble
          type='incoming'
          message='답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요답장합니다. 안녕하세요'
        />
        <MessageDate date='23.10.10' />
        <MessageBubble type='outgoing' message='제안 수락' />
        <MessageBubble type='outgoing' message='제안 수락' />
        <MessageBubble type='incoming' message='답장합니다. 안녕하세요' />
      </div>

      <MessageChatForm />
    </div>
  );
}
