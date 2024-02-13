import Link from 'next/link';

interface ProfileFlwFlwerProps {
  type?: 'my';
  follow: number;
  follower: number;
}

export function ProfileFlwFlwer({
  type,
  follow,
  follower,
}: ProfileFlwFlwerProps) {
  const href = type === 'my' ? '/mypage/follow' : '#';

  return (
    <Link
      href={href}
      className='bg-brand-5 relative flex h-[53px] w-full rounded-md'
    >
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{follow || 0}</div>
        <div className='text-B5R10 text-neutral-50'>팔로우</div>
      </div>
      <div className='bg-brand-30 absolute left-1/2 top-[10px] h-[33px] w-[1px] rounded-md' />
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{follower || 0}</div>
        <div className='text-B5R10 text-neutral-50'>팔로워</div>
      </div>
    </Link>
  );
}
