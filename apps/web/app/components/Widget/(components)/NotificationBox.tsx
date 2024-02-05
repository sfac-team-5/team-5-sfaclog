'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/Avatar';
import { NotificationType } from '@/types';
import { formatDate } from '@/utils/formatUtils';

interface NotificationBoxProps {
  notification: NotificationType;
}

export function NotificationBox({ notification }: NotificationBoxProps) {
  const router = useRouter();
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleClick = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: notification.id }),
      },
    );

    if (response.ok) {
      setIsRead(true);
      router.push(notification.link);
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-6 py-3 ${isRead ? 'bg-white' : 'bg-brand-10'}`}
      onClick={handleClick}
    >
      <Avatar size={50} />
      <div className='flex w-[calc(100%-50px)] flex-col gap-1'>
        <p className='text-neutral-70 text-B3R12'>{notification.content}</p>
        <span className='text-neutral-40 text-B5R10'>
          {formatDate(notification.created)}
        </span>
      </div>
    </div>
  );
}
