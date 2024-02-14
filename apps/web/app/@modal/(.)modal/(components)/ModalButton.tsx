import { useModalDataActions } from '@/hooks/stores/useModalStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface ModalButtonProps {
  action: any;
}

function ModalButton({ action }: ModalButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { onReset: resetModalData } = useModalDataActions();

  const onCancel = () => {
    if (type === 'back') {
      resetModalData();
      router.push('/log/write');
    } else {
      router.back();
    }
  };

  const onAction = () => {
    resetModalData();
    action();
  };

  return (
    <div className='grid grid-cols-2'>
      <button
        className='bg-highlight-popup pb-[10px] pt-[11px] text-center text-B1M16 text-text-primary'
        onClick={onCancel}
      >
        취소
      </button>
      <button
        onClick={onAction}
        className='bg-brand-90 pb-[10px] pt-[11px] text-center text-B1M16 text-text-white'
      >
        확인
      </button>
    </div>
  );
}

export default ModalButton;
