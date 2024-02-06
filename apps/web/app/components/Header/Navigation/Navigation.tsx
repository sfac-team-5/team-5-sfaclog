import Link from 'next/link';

import { NavAuthBtn } from './NavAuthBtn';
import { NavSearch } from './NavSearch';
import { Tabs } from '@repo/ui/Tabs';
import { Logo } from '@public/svgs';

export async function Navigation() {
  const navClasses =
    'ui-selected:font-bold ui-selected:border-neutral-90 ui-selected:border-b-2 flex h-[64px] w-max items-center justify-center border-b-2 border-transparent px-[24px] py-[10px] text-[16px] outline-none duration-200 ease-in-out';

  return (
    <nav className='flex size-full items-center'>
      <Tabs>
        <Link
          href='/'
          className='mr-[40px] flex h-[64px] items-center outline-none'
        >
          <Logo className='fill-brand-100 h-[20px] w-[120px]' />
        </Link>
        <Link href={'/popular'} className={navClasses}>
          인기 로그
        </Link>
        <Link href={'/recently'} className={navClasses}>
          최신로그
        </Link>
        <Link href={'/following'} className={navClasses}>
          팔로잉 로그
        </Link>
        <Link href={'/community'} className={navClasses}>
          커뮤니티
        </Link>
      </Tabs>
      <div className='ml-auto flex items-center gap-3'>
        <NavSearch />
        <NavAuthBtn />
      </div>
    </nav>
  );
}
