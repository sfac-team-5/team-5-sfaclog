import { IconArrowLeftBlack, IconKebabBlack } from '@repo/ui/Icon';
import { Avatar } from '../../Avatar';
import { MessageChatForm } from './MessageChatForm';
import { MessageIncoming } from './MessageIncoming';
import { MessageOutgoing } from './MessageOutgoing';
import { MessageDate } from './MessageDate';
import { MessageOffer } from './MessageOffer';
import { MessageBubble } from './MessageBubble';

export function MessageChat() {
  return (
    <div className='absolute top-0 size-full rounded-md bg-white'>
      <div className='border-neutral-10 flex items-center justify-between border-b px-5 py-3.5'>
        <IconArrowLeftBlack className='cursor-pointer' />
        <div className='flex items-center gap-2.5'>
          <Avatar size={25} />
          <span className='text-B2B14 text-neutral-90'>Name</span>
        </div>
        <IconKebabBlack className='cursor-pointer' />
      </div>

      <div className='scrollbar-hide flex h-[calc(100%-54px-68px)] w-full flex-col overflow-auto scroll-smooth px-6'>
        <MessageDate date='23.10.10' />
        <MessageOffer />
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
