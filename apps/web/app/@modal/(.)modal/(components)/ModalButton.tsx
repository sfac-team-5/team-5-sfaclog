import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ModalButtonProps {
  action: any;
}

function ModalButton({ action }: ModalButtonProps) {
  const router = useRouter();

  return (
    <div className='grid grid-cols-2'>
      <button
        className='bg-highlight-popup text-B1M16 text-text-primary pb-[10px] pt-[11px] text-center'
        onClick={() => router.back()}
      >
        취소
      </button>
      <button
        onClick={action}
        className='bg-brand-90 text-B1M16 text-text-white pb-[10px] pt-[11px] text-center'
      >
        확인
      </button>
    </div>
  );
}

export default ModalButton;
