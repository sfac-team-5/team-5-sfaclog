import { formatDate } from '@/utils/formatUtils';

interface CardDateProps {
  date: string;
}

export function CardDate({ date }: CardDateProps) {
  return <span className='text-neutral-40 text-B3R12'>{formatDate(date)}</span>;
}
