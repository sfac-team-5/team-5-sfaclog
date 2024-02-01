import { Avatar } from '@/components/Avatar';

interface NotificationBoxProps {
  unread: boolean;
}

export function NotificationBox({ unread }: NotificationBoxProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-6 py-3 ${unread ? 'bg-brand-10' : 'bg-white'}`}
    >
      <Avatar size={100} />
      <div className='flex flex-col gap-1'>
        <p className='text-neutral-70 text-B3R12'>
          <span className='text-B3B12'>Nara</span>님 외 42명이 회원님의 로그를
          좋아합니다: 스펙폴리오에서 디자이너 찾는 방법을 우리 모두 한번···
        </p>
        <span className='text-neutral-40 text-[10px]'>1분 전</span>
      </div>
    </div>
  );
}
