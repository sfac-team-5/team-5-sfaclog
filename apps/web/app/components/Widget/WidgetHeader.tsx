import { IconCancelBlack } from '@repo/ui/Icon';
import React from 'react';

interface WidgetHeaderProps {
  type: '알림' | '메시지';
  onClose: () => void;
}

export function WidgetHeader({ type, onClose }: WidgetHeaderProps) {
  return (
    <div className='flex items-center justify-between px-6 py-[30px]'>
      <p className='text-H1B24 text-neutral-90'>{type}</p>
      <button onClick={onClose}>
        <IconCancelBlack width='24' />
      </button>
    </div>
  );
}
