import React from 'react';
import { HeaderTabs } from './HeaderTabs';
import { Navigation } from './Navigation/Navigation';
export function Header() {
  return (
    <header className='h-fit w-full'>
      <div className='bg-neutral-5 relative h-[46px]'>
        <div className='container'>
          <HeaderTabs />
        </div>
      </div>
      <div className='h-[64px] bg-white'>
        <div className='container'>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
