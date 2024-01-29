import React from 'react';
import {
  IconFacebook,
  IconInstagram,
  IconYoutube,
} from '../../../../public/svgs';

function FooterTop() {
  return (
    <div className='container pb-4 pt-5'>
      <div className='flex justify-between'>
        <div className='flex gap-6'>
          <span className='cursor-pointer'>서비스소개</span>
          <span className='cursor-pointer'>개인정보 처리방침</span>
          <span className='cursor-pointer'>서비스 이용약관</span>
          <span className='cursor-pointer'>환불규정</span>
        </div>
        <div className='flex gap-3'>
          <IconFacebook className='cursor-pointer' />
          <IconInstagram className='cursor-pointer' />
          <IconYoutube className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
