'use client';

import React from 'react';
import ModalBox from './(components)/ModalBox';
import { useModalData } from '@/hooks/stores/useModalStore';

function Modal() {
  const { title, description, action } = useModalData();

  if (!title) return;

  return (
    <div className='size-screen fixed inset-0 z-[100] flex items-center justify-center bg-black/30'>
      <ModalBox title={title} description={description} action={action} />
    </div>
  );
}

export default Modal;
