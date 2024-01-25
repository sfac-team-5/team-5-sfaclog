import { NavAuthBtn } from './NavAuthBtn';
import { NavSearch } from './NavSearch';
import { NavTabs } from '@repo/ui/NavTabs';
import Link from 'next/link';
export async function Navigation() {
  const navClass =
    'h-[80px] w-[120px] text-white ui-selected:bg-primary-60 outline-none inline-flex items-center justify-center';
  //sm:w-[768px] md:w-[1024px] lg:w-[1440px]
  // className={`ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30  w-32 outline-none`}
  return (
    <div className='mx-auto w-fit'>
      <nav className='w-[1440px] h-[50px] bg-pink-200 pl-44'>
        <NavTabs defaultSelectedTabIndex={1}>
          <Link
            href={'#'}
            className='ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30 inline-flex items-center justify-center w-[120px] h-[50px] outline-none'
          >
            SFACFOLIO
          </Link>
          <Link
            href={'#'}
            className='ui-selected:bg-primary-50 ui-not-selected:bg-neutral-30 inline-flex items-center justify-center w-[120px] h-[50px] outline-none'
          >
            SFACLOG
          </Link>
        </NavTabs>
      </nav>
      <nav className='bg-neutral-60 flex h-[80px] items-center justify-center w-[1440px]'>
        <NavTabs>
          <Link href={'#'} className={navClass}>
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
        <div className='mx-5 hidden sm:block md:block lg:block'>
          <NavSearch />
        </div>
        <NavAuthBtn />
      </nav>
    </div>
  );
}
