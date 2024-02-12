import { UserType } from '@/types';
import React from 'react';

export function ProfileCareer({ career }: Partial<UserType>) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='text-B1B16'>경력사항</div>
      {career &&
        career.map(item => (
          <div key={item.company}>
            <div className='text-B3B12 text-text-primary mb-1'>
              {item.from} ~ {item.to}
            </div>
            <div className='text-B2M14 text-text-primary'>{item.company}</div>
          </div>
        ))}
    </div>
  );
}
