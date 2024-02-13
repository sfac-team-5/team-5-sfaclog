'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconKebob } from '@public/svgs';
import { useModalDataActions } from '@/hooks/stores/useModalStore';

interface KebobMenuProps {
  logId: string;
}

function KebobMenu({ logId }: KebobMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { onChange: changeModalData } = useModalDataActions();

  const onEdit = () => {
    router.push(`/log/edit/${logId}`);
  };

  const onDelete = (id: string) => {
    changeModalData({
      title: '삭제하기',
      description: '작성하신 로그를 삭제하시겠습니까?',
      action: async () => {
        const response = await fetch(`/api/log/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) return alert('삭제 실패요 ㅜㅜ');
        router.push('/');
      },
    });
    router.push(`/modal`);
  };

  return (
    <div className='relative'>
      <IconKebob
        className='mb-3 cursor-pointer'
        onClick={() => setIsOpen(prev => !prev)}
      />
      {isOpen && (
        <ul className='absolute right-0 z-10 w-[88px] rounded-[6px] bg-white px-1.5 py-2 text-B2R14 shadow-custom'>
          <li
            onClick={onEdit}
            className='h-[42px] cursor-pointer rounded-[4px] p-3 text-neutral-70 duration-200 hover:bg-brand-10 hover:text-[#0059FF]'
          >
            수정하기
          </li>
          <li
            onClick={() => onDelete(logId)}
            className='h-[42px] cursor-pointer rounded-[4px] p-3 text-neutral-70 duration-200 hover:bg-brand-10 hover:text-[#0059FF]'
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}

export default KebobMenu;
