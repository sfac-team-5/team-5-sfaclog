import React from 'react';

interface ModalBodyProps {
  title: string;
  description: string;
}

function ModalBody({ title, description }: ModalBodyProps) {
  return (
    <div className='flex h-[132px] w-full flex-col items-center justify-center gap-3 bg-white'>
      <p className='text-B1B16 text-primary'>{title}</p>
      <p className='text-text-secondary text-B3R12 max-w-[191px] break-keep text-center'>
        {description}
      </p>
    </div>
  );
}

export default ModalBody;
