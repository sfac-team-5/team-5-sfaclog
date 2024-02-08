import React from 'react';

function FindPasswordFormHeader({
  title,
  description,
  subDescription,
}: {
  title: string;
  description: string;
  subDescription?: string;
}) {
  return (
    <div className='mb-[28px] flex flex-col items-center gap-[20px]'>
      <span className='text-H0M32 text-text-secondary'>{title}</span>
      <span className='text-B1R16 text-text-primary'>{description}</span>
      <span className='text-B1R16 text-text-primary'>{subDescription}</span>
    </div>
  );
}

export default FindPasswordFormHeader;
