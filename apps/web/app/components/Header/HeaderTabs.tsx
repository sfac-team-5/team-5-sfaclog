import React from 'react';
import { Tabs } from '@repo/ui/Tabs';
import { Logo } from '@public/svgs';
import Link from 'next/link';
export function HeaderTabs() {
  return (
    <Tabs defaultSelectedTabIndex={1}>
      <Link href={'#'}>
        <div className='ui-selected:z-10  ui-selected:bg-white ui-not-selected:bg-neutral-10 absolute left-0 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md p-[10px] outline-none duration-300 ease-in-out'>
          <Logo className='fill-brand-100 ui-not-selected:fill-neutral-40 h-[13px] w-[79px] duration-300 ease-in-out' />
        </div>
      </Link>
      <Link href={'#'}>
        <div className='ui-selected:z-10 ui-selected:bg-white ui-not-selected:bg-neutral-10 absolute left-24 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md p-[10px] outline-none duration-300 ease-in-out'>
          <Logo className='fill-brand-100 ui-not-selected:fill-neutral-40 h-[13px] w-[79px] duration-300 ease-in-out' />
        </div>
      </Link>
    </Tabs>
  );
}
