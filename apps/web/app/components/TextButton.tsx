import { IconArrowRightSmall } from '@public/svgs';
import Link from 'next/link';
import React from 'react';

interface TextButtonProps {
  link: string;
}

function TextButton({ link }: TextButtonProps) {
  return (
    <Link
      href={link}
      className='text-B2R14 text-neutral-80 flex h-[28px] w-[83px] cursor-pointer items-center gap-2 px-3'
    >
      더보기
      <IconArrowRightSmall />
    </Link>
  );
}

export default TextButton;
