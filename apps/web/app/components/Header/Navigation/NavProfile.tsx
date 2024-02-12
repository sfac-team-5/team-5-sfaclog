import Image from 'next/image';
import Link from 'next/link';

import { LogoutAction } from './action';

interface NavProfileProps {
  image: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function NavProfile({ image, isOpen, onToggle }: NavProfileProps) {
  return (
    <div className='relative'>
      <Image
        src={image}
        width={30}
        height={30}
        alt='avatar'
        className='cursor-pointer rounded-full'
        onClick={onToggle}
      />

      {isOpen && (
        <div className='shadow-custom absolute right-0 z-40 mt-3 flex max-h-60 w-max flex-col overflow-auto rounded-md bg-white p-2 text-base focus:outline-none sm:text-sm'>
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
