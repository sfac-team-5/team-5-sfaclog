import { formatDate } from '@/utils/formatUtils';

interface CardDateProps {
  date: string;
}

export function CardDate({ date }: CardDateProps) {
  return (
    <span className='text-neutral-40 text-[12px]'>{formatDate(date)}</span>
  );
}
