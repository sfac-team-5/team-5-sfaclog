'use client';
import React from 'react';
import FindPasswordFormHeader from '../(components)/FindPasswordFormHeader';
import Button from '@repo/ui/Button';
import { useSearchParams } from 'next/navigation';
import { repeatChangePasswordEmail } from './action';
export default function page() {
  const searchParams = useSearchParams();
  const emailAddress = searchParams.get('email');
  return (
    <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
      <FindPasswordFormHeader
        title='비밀번호 찾기'
        description='비밀번호 재설정을 위한 이메일을 전송했습니다.'
        subDescription='메일함을 확인해주세요.'
      />
      <Button
        type='button'
        label='재전송하기'
        size='l'
        onClick={async () => {
          if (emailAddress) {
            const result = await repeatChangePasswordEmail(emailAddress);
            if (result) alert('이메일이 재전송 되었습니다.');
            else alert('이메일 재전송에 실패 하였습니다');
          } else alert('에러나 404페이지로 보내야함');
        }}
      />
    </main>
  );
}
