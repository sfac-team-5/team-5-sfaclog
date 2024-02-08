'use client';
import { useState } from 'react';

import { IconMessageLine } from '@repo/ui/Icon';
import { MessageWidget } from '@/components/Widget/MessageWidget';

export function NavMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <IconMessageLine
        className='cursor-pointer'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && <MessageWidget onClose={onClose} />}
    </div>
  );
}
