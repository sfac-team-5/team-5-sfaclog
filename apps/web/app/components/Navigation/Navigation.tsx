import Link from 'next/link';

import { NavAuthBtn } from './NavAuthBtn';
import { NavSearch } from './NavSearch';
import { NavTabs } from '@repo/ui/NavTabs';

export async function Navigation() {
  const navClass =
    'h-[80px] w-[120px] text-white ui-selected:bg-primary-60 outline-none inline-flex items-center justify-center';
  //sm:w-[768px] md:w-[1024px] lg:w-[1440px]
  // className={`ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30  w-32 outline-none`}

  return (
    <>
      <div className='w-screen bg-pink-200'>
        <nav className='mx-auto h-[50px] w-[1440px] px-20'>
          <NavTabs defaultSelectedTabIndex={1}>
            <Link
              href={'#'}
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className='ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30 inline-flex h-[50px] w-[120px] items-center justify-center outline-none'
            >
              SFACFOLIO
            </Link>
            <Link
              href='/'
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className='ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30 inline-flex h-[50px] w-[120px] items-center justify-center outline-none'
            >
              SFACLOG
            </Link>
          </NavTabs>
        </nav>
      </div>

      <div className='bg-neutral-60 w-screen'>
        <nav className='mx-auto flex h-[80px] w-[1440px] items-center justify-between px-20'>
          <NavTabs>
            <Link href='/' className={navClass}>
              LOGO
            </Link>
            <Link href={'#'} className={navClass}>
              로그
            </Link>
            <Link href={'#'} className={navClass}>
              포트폴리오
            </Link>
            <Link href={'#'} className={navClass}>
              커뮤니티
            </Link>
            <Link href={'#'} className={navClass}>
              프로젝트
            </Link>
          </NavTabs>
          <div className='flex items-center justify-end'>
            <NavSearch />
            <NavAuthBtn />
          </div>
        </nav>
      </div>
    </>
  );
}
