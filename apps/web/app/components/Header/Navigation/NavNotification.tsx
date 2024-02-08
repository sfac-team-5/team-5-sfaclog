'use client';
import { useState } from 'react';

import { NotificationWidget } from '@/components/Widget/NotificationWidget';
import { IconAlramLineBlack } from '@repo/ui/Icon';

interface NavNotificationProps {
  userid: string;
}

export function NavNotification({ userid }: NavNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <IconAlramLineBlack
        className='cursor-pointer'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && <NotificationWidget userid={userid} onClose={onClose} />}
    </div>
  );
}
