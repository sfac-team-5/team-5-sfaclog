import TextButton from './TextButton';

interface SectionHeaderProps {
  title: string;
  more?: string;
}

export function SectionHeader({ title, more }: SectionHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <p className='text-H1M24'>{title}</p>
      {more && <TextButton link='/login' />}
    </div>
  );
}
