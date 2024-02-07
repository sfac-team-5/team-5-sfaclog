'use client';
import { Complete } from '@public/svgs';
import Button from '@repo/ui/Button';
import React from 'react';
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter();
  return (
    <section className='mx-auto mt-10 flex flex-col items-center'>
      <div>
        <Complete />
      </div>
      <div className='text-text-primary text-H0M32 mb-[10px] mt-10'>
        스팩로그에 오신 걸 환영합니다
      </div>
      <div className='text-neutral-70 text-B1R16 mb-10'>
        지금 바로 다양한 로그를 감상해보세요!
      </div>
      <div className='mb-28'>
        <Button
          type='button'
          label='로그인'
          size='l'
          onClick={() => {
            router.push('/login');
          }}
        />
      </div>
    </section>
  );
}
