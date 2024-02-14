import React from 'react';
import { LogoFooter } from '../../../public/svgs';
import FooterInfo from './(components)/FooterInfo';
import FooterCustomService from './(components)/FooterCustomService';

function FooterBottom() {
  return (
    <div className='container flex justify-between py-8'>
      <div className='flex gap-[42px]'>
        <LogoFooter className='shrink-0' />
        <FooterInfo />
      </div>
      <FooterCustomService />
    </div>
  );
}

export default FooterBottom;
