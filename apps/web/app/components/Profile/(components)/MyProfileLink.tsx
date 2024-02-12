import React from 'react';
import Link from 'next/link';
import { IconTaillessArrowRightBlack } from '@repo/ui/Icon';
export function MyProfileLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link href={href || '/'}>
      <div className='flex items-center justify-between'>
        <div className='text-B2R14'>{title}</div>
        <div className='size-4'>
          <IconTaillessArrowRightBlack />
        </div>
      </div>
    </Link>
  );
}
