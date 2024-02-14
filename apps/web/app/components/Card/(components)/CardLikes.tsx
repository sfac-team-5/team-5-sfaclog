import { formatNumber } from '@/utils/formatUtils';
import { IconHeartBlack } from '@repo/ui/Icon';

export interface CountProps {
  count: number;
}

export function CardLikes({ count }: CountProps) {
  return (
    <div className='text-neutral-70 flex items-center gap-1 text-[11px]'>
      <IconHeartBlack className='size-4' /> {formatNumber(count)}
    </div>
  );
}
