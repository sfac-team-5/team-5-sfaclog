import { MessageType } from '@/types';
import MessageTime from './MessageTime';

interface MessageBubbleProps {
  message: string;
  type: MessageType;
}

export function MessageBubble({ message, type }: MessageBubbleProps) {
  return (
    <div
      className={`mb-[15px] flex w-full items-end gap-1 ${type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
    >
      {type === 'outgoing' && (
        <MessageTime isRead={true} time='오후 3:55' type='outgoing' />
      )}
      <div
        className={`text-B3R12 flex min-h-[34px] min-w-5 max-w-[250px] items-center rounded-md  p-2 ${type === 'outgoing' ? 'bg-brand-90 rounded-br-none text-white' : 'bg-neutral-5 text-neutral-90 rounded-bl-none'}`}
      >
        {message}
      </div>
      {type === 'incoming' && (
        <MessageTime isRead={true} time='오후 3:55' type='incoming' />
      )}
    </div>
  );
}
