import { useRouter } from 'next/navigation';
import React from 'react';

interface ModalButtonProps {
  action: any;
  type: string | null;
}

function ModalButton({ action, type }: ModalButtonProps) {
  const router = useRouter();

  return (
    <div className='grid grid-cols-2'>
      <button
        className='bg-highlight-popup pb-[10px] pt-[11px] text-center text-B1M16 text-text-primary'
        onClick={() => {
          type === 'log-cancel' ? router.push('/log/write') : router.back();
        }}
      >
        취소
      </button>
      <button
        onClick={action}
        className='bg-brand-90 pb-[10px] pt-[11px] text-center text-B1M16 text-text-white'
      >
        확인
      </button>
    </div>
  );
}

export default ModalButton;
