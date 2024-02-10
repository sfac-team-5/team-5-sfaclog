import React from 'react';

export function ProfileSNS({ sns }: { sns: Record<string, string> }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-B1B16'>SNS</div>
      <div className='flex flex-wrap gap-5'>
        아이콘 자리 - 개발중
        {Object.values(sns).map((el, idx) => (
          <div key={idx}>{el}</div>
        ))}
      </div>
    </div>
  );
}
