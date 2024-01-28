import React from 'react';
import { HeaderTabs } from './HeaderTabs';
import { Navigation } from './Navigation/Navigation';
export function Header() {
  return (
    <header className='h-fit w-full min-w-[1440px]'>
      <div className='bg-neutral-5 relative h-[46px]'>
        <HeaderTabs />
      </div>
      <div className='h-[64px] bg-white px-[240px]'>
        <Navigation />
      </div>
    </header>
  );
}
