import React from 'react';
import ModalBody from './ModalBody';
import ModalButton from './ModalButton';

interface ModalBoxProps {
  title: string;
  description: string;
  action?: any;
  type: string | null;
}
function ModalBox({ title, description, action, type }: ModalBoxProps) {
  return (
    <div className='h-[172px] w-[306px] overflow-hidden rounded-[6px] bg-white shadow-custom'>
      <ModalBody title={title} description={description} />
      <ModalButton action={action} type={type} />
    </div>
  );
}

export default ModalBox;
