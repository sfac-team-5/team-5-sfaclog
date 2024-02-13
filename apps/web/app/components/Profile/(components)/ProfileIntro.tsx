import Image from 'next/image';
import React from 'react';
interface ProfileIntro {
  username: string;
  userintro: string;
  imageUrl: string;
}
export function ProfileIntro({ imageUrl, username, userintro }: ProfileIntro) {
  return (
    <div className='flex flex-col gap-5 object-cover'>
      {imageUrl === 'error' ? (
        <div className=' bg-neutral-10 text-text-white	 flex size-[205px] select-none items-center justify-center rounded-md '>
          이미지를 등록해주세요.
        </div>
      ) : (
        <Image
          src={imageUrl}
          width={205}
          height={205}
          alt='userImage'
          className='rounded-md'
        />
      )}

      <div className='text-text-primary flex flex-col gap-2'>
        <div className='text-B1B16'>{username}</div>
        <div className='text-B2R14'>{userintro}</div>
      </div>
    </div>
  );
}
