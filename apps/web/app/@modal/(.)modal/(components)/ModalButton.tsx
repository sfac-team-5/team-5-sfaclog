import { useModalDataActions } from '@/hooks/stores/useModalDataStore';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ModalButtonProps {
  action: any;
  type: string | null;
}

function ModalButton({ action, type }: ModalButtonProps) {
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

  const onCancel = () => {
    if (type === 'log-cancel') {
      changeModalData({ type: null });
      router.push('/log/write');
    } else {
      router.back();
    }
  };

  const onAction = () => {
    changeModalData({ type: null });
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
