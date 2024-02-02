import { Avatar } from '@/components/Avatar';
import { formatDate } from '@/utils/formatUtils';

interface NotificationBoxProps {
  isRead: boolean;
  content: string;
  created: string;
}

export function NotificationBox({
  isRead,
  content,
  created,
}: NotificationBoxProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-6 py-3 ${isRead ? 'bg-white' : 'bg-brand-10'}`}
    >
      <Avatar size={50} />
      <div className='flex w-[calc(100%-50px)] flex-col gap-1'>
        <p className='text-neutral-70 text-B3R12'>
          {/* <span className='text-B3B12'>Nara</span>님 외 42명이 회원님의 로그를
          좋아합니다: 스펙폴리오에서 디자이너 찾는 방법을 우리 모두 한번··· */}
          {content}
        </p>
        <span className='text-neutral-40 text-B5R10'>
          {formatDate(created)}
        </span>
      </div>
    </div>
  );
}
