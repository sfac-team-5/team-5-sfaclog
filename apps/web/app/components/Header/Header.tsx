import React from 'react';
import { HeaderTabs } from './HeaderTabs';
import { Navigation } from './Navigation/Navigation';
import { NotificationWidget } from '../Widget/NotificationWidget';
import { MessageWidget } from '../Widget/MessageWidget';

export function Header() {
  return (
    <header className='h-fit w-full'>
      <div className='bg-neutral-5 relative h-[46px]'>
        <div className='mx-auto h-full w-[1440px] px-[184px]'>
          <HeaderTabs />
        </div>
      </div>
      <div className='relative h-[64px] bg-white'>
        <div className='container'>
          <Navigation />
          <NotificationWidget />
          {/* <MessageWidget /> */}
        </div>
      </div>
    </header>
  );
}
