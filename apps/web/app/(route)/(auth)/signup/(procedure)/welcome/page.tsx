'use client';

import { useRouter } from 'next/navigation';

import { Welcome } from '@public/svgs';
import Button from '@repo/ui/Button';
import Footer from '@/components/Footer/Footer';

export default function page() {
  const router = useRouter();

  return (
    <>
      <section className='mx-auto my-32 flex flex-col items-center gap-6'>
        <div>
          <Welcome />
        </div>
        <div className='text-text-primary text-H0M32'>
          스팩로그에 오신 걸 환영합니다
        </div>
        <div className='text-neutral-70 text-B1R16'>
          지금 바로 다양한 로그를 감상해 보세요!
        </div>
        <div className='w-[400px]'>
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

      <Footer />
    </>
  );
}
