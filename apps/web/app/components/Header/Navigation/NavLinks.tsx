'use client';
import { Logo } from '@public/svgs';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
export function NavLinks() {
  const pathname = usePathname();
  const navClasses =
    'flex h-[64px] w-max items-center justify-center border-b-2 px-[24px] py-[10px] outline-none duration-200 ease-in-out';
  return (
    <>
      <Link
        href='/'
        className='mr-[40px] flex h-[64px] items-center outline-none'
      >
        <Logo className='h-[20px] w-[120px] fill-brand-100' />
      </Link>
      <Link
        href={'/popular'}
        className={`${pathname.startsWith('/popular') ? 'text-B1B16 border-neutral-90' : 'text-B1R16 border-transparent'} ${navClasses}`}
      >
        인기 로그
      </Link>
      <Link
        href={'/recently'}
        className={`${pathname.startsWith('/recently') ? 'text-B1B16 border-neutral-90' : 'text-B1R16 border-transparent'} ${navClasses}`}
      >
        최신 로그
      </Link>
      <Link
        href={'/following'}
        className={`${pathname.startsWith('/following') ? 'text-B1B16 border-neutral-90' : 'text-B1R16 border-transparent'} ${navClasses}`}
      >
        팔로잉 로그
      </Link>
      <Link
        href={'/community'}
        className={`${pathname.startsWith('/community') ? 'text-B1B16 border-neutral-90' : 'text-B1R16 border-transparent'} ${navClasses}`}
      >
        커뮤니티
      </Link>
    </>
  );
}
