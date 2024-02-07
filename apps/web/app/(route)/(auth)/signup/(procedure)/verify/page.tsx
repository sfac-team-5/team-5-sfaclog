'use client';
import React from 'react';
import { Complete } from '@public/svgs';
import Button from '@repo/ui/Button';
import { useSearchParams } from 'next/navigation';
import { repeatVerifyEmail } from './action';
export default function page() {
  const searchParams = useSearchParams();
  const emailAddress = searchParams.get('email');
  return (
    <section className='mx-auto mt-10 flex flex-col items-center justify-center'>
      <div>
        <Complete />
      </div>
      <div className='text-H0M32 text-neutral-70 mb-6 mt-2'>
        이메일 전송 완료
      </div>
      <div className='text-B2R14 text-text-primary mb-12 text-center'>
        <div>작성하신 메일주소로 인증요청을 보냈습니다.</div>
        <div>메일함을 확인해주세요</div>
      </div>
      <div className='mb-28'>
        <Button
          type='button'
          label='재전송하기'
          size='l'
          onClick={async () => {
            if (emailAddress) {
              const result = await repeatVerifyEmail(emailAddress);
              if (result) alert('이메일이 재전송 되었습니다.');
              else alert('이메일 재전송에 실패 하였습니다');
            } else alert('에러나 404페이지로 보내야함');
          }}
        />
        <div className='text-text-secondary text-B2R14 mt-2 leading-tight tracking-tighter'>
          메일이 오지 않았다면, 스팸메일함을 확인하거나 프로모션 메일함을
          확인해주세요
        </div>
      </div>
    </section>
  );
}
