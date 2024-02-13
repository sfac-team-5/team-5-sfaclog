import Link from 'next/link';
import AvatarImage from '../AvatarImage';

interface FollowingButtonProps {
  user: string;
  userName: string;
  className?: string;
  active?: boolean;
  onClick: () => void;
}

function FollowingButton({
  user,
  userName,
  className,
  active,
  onClick,
}: FollowingButtonProps) {
  return (
    <Link
      href={`/following?user=${user}`}
      className='flex flex-col items-center gap-2'
      onClick={onClick}
    >
      {user === '전체' ? (
        <button className='text-H2B20 text-text-white bg-brand-100 flex size-20 items-center justify-center rounded-full'>
          ALL
        </button>
      ) : (
        <button
          className={`hover:border-brand-100 shadow-custom overflow-hidden rounded-full border-[3px] border-transparent transition-all duration-300 ${className} ${
            active && 'border-brand-100'
          }`}
        >
          <AvatarImage size={74} fill='#ffffff' />
        </button>
      )}
      <span className='text-B3R12 text-text-primary'>{userName}</span>
    </Link>
  );
}

export default FollowingButton;
