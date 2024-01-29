import React from 'react';
import {
  IconFacebook,
  IconInstagram,
  IconYoutube,
} from '../../../../public/svgs';

function FooterTop() {
  return (
    <div className='pb-4 pt-5'>
      <div className='flex justify-between'>
        <div className='flex gap-6'>
          <span>서비스소개</span>
          <span>개인정보 처리방침</span>
          <span>서비스 이용약관</span>
          <span>환불규정</span>
        </div>
        <div className='flex gap-3'>
          <IconFacebook />
          <IconInstagram />
          <IconYoutube />
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
