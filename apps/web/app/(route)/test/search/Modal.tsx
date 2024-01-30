'use client';
import React, { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
export function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative'>
      <div className='fixed inset-0 z-20 bg-black/30' aria-hidden='true' />
      <Dialog.Panel as={Fragment}>
        <div className='absolute inset-x-1/3 z-30 size-96 bg-white'></div>
      </Dialog.Panel>
    </Dialog>
  );
}
