import React from 'react';

export function NotificationSection({ label }: { label: string }) {
  return (
    <div className='border-neutral-10 text-B1B16 text-neutral-70 w-full border-t px-6 py-4'>
      {label}
    </div>
  );
}
