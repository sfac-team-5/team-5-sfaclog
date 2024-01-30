import { formatNumber } from '@/utils/formatUtils';
import { IconViewBlack } from '@repo/ui/Icon';

export interface CountProps {
  count: number;
}

export function CardViews({ count }: CountProps) {
  return (
    <div className='flex items-center gap-1 text-[11px]'>
      <IconViewBlack className='size-4' /> {formatNumber(count)}
    </div>
  );
}
