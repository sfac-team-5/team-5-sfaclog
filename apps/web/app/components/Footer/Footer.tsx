import React from 'react';
import FooterTop from './(components)/FooterTop';
import FooterBottom from './FooterBottom';

function Footer() {
  return (
    <footer className='bg-black text-white'>
      <FooterTop />
      <div className='h-[1px] w-full bg-neutral-70'></div>
      <FooterBottom />
    </footer>
  );
}

export default Footer;
