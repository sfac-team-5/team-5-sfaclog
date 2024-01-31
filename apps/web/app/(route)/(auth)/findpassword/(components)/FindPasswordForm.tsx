'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputBox } from '@repo/ui/InputBox';
import Button from '@repo/ui/Button';

function FindPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      verification: '',
    },
  });

  return (
    <form className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3'>
        <p className='text-B1B16'>이름</p>
        <InputBox
          placeholder='이름을 입력해주세요.'
          errorMessage={errors.name?.message}
          onValueChange={name => setValue('name', name)}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-B1M16'>이메일 인증</p>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col gap-2'>
            <InputBox
              placeholder='이메일 주소를 입력해주세요.'
              errorMessage={errors.email?.message}
              onValueChange={email => setValue('email', email)}
            />
            <p className='text-B3R12 text-neutral-40'>
              이메일 예시: abcde123@gmail.com
            </p>
          </div>
          <div>
            <Button type='button' size='s' label='인증요청' />
          </div>
        </div>
        <InputBox
          placeholder='인증 번호를 입력해주세요.'
          errorMessage={errors.verification?.message}
          onValueChange={verification => setValue('verification', verification)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Button type='submit' size='l' label='다음' />
        <div className='flex justify-between'>
          <p className='text-B2R14'>비밀번호가 생각나셨나요?</p>
          <Link href={'/login'} className='text-B2R14 underline'>
            로그인하기
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FindPasswordForm;
