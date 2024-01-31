import { formatNumber } from '@/utils/formatUtils';
import { IconChatBlack } from '@repo/ui/Icon';
import { CountProps } from './CardLikes';

export function CardComments({ count }: CountProps) {
  return (
    <div className='flex items-center gap-1 text-[11px]'>
      <IconChatBlack className='size-4' /> {formatNumber(count)}
    </div>
  );
}
