'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoutAction } from './action';

interface NavProfileProps {
  image: string;
}

export function NavProfile({ image }: NavProfileProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className='relative'>
      <Image
        src={image}
        width={30}
        height={30}
        alt='avatar'
        className='cursor-pointer rounded-full'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />

      {isOpen && (
        <div className='shadow-custom absolute right-0 z-10 mt-3 flex max-h-60 w-max flex-col overflow-auto rounded-md bg-white p-2 text-base focus:outline-none sm:text-sm'>
          <Link
            href='/mypage'
            className={`text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative cursor-pointer select-none rounded-md p-3 text-center`}
          >
            마이페이지
          </Link>
          <form action={LogoutAction} className='w-full'>
            <button
              type='submit'
              className={`text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative w-full cursor-pointer select-none rounded-md p-3 text-center`}
            >
              로그아웃
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
