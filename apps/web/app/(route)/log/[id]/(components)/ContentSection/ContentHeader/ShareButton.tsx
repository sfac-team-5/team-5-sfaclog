'use client';

import React from 'react';
import { IconShare } from '@public/svgs';

function ShareButton() {
  const onShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };
  return <IconShare className='cursor-pointer' onClick={onShare} />;
}

export default ShareButton;
