'use client';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { submitAction } from '../action';
import { useRouter } from 'next/navigation';
import { InputBox } from '@repo/ui/InputBox';
import Button from '@repo/ui/Button';
import SNSButton from '@repo/ui/SNSButton';
import { IconGoogle, IconKakao, IconNaver } from '@public/svgs';
import { KeepLogin } from './KeepLogin';

export interface LoginInputType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginInputType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginInputType) => {
    const { loginSuccess } = await submitAction(data);

    if (loginSuccess) {
      alert('로그인되었습니다.');
      router.push('/');
    } else {
      console.log('다시 로그인해 주세요.');
    }
  };

  const emailRegister = register('email', {
    required: '아이디를 입력해 주세요.',
  });

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해 주세요.',
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='flex flex-col gap-3'>
        <InputBox
          placeholder='이메일을 입력해주세요.'
          errorMessage={errors.email?.message}
          onValueChange={email => setValue('email', email)}
        />
        <InputBox
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          errorMessage={errors.password?.message}
          onValueChange={password => setValue('password', password)}
        />
      </div>
      <div className='mb-5 mt-2 flex items-center justify-between'>
        <KeepLogin />
        <Link href={'/findpassword'} className='text-B3R12 text-text-secondary'>
          비밀번호 찾기
        </Link>
      </div>
      <Button type='submit' size='l' label='로그인' />
      <div className='mb-3 mt-10 flex items-center before:flex-1 before:border-t before:border-black/20 after:flex-1 after:border-t after:border-black/20 '>
        <p className='text-text-secondary mx-2 text-center text-sm'>또는</p>
      </div>
      <div className='flex flex-col gap-[13px]'>
        <SNSButton
          type='button'
          size='l'
          label='Google 계정 로그인'
          labelColor='text-neutral-90'
          bgColor='bg-white'
          borderColor='border-neutral-30'
          icon={<IconGoogle />}
        />
        <SNSButton
          type='button'
          size='l'
          label='Kakao 계정 로그인'
          labelColor='text-neutral-90'
          bgColor='bg-[#FFDE02]'
          icon={<IconKakao />}
        />
        <SNSButton
          type='button'
          size='l'
          label='Naver 계정 로그인'
          labelColor='text-white'
          bgColor='bg-[#03C75A]'
          icon={<IconNaver />}
        />
      </div>
      <div className='mt-3 flex justify-between'>
        <p className='text-B2R14'>아직 회원이 아니신가요?</p>
        <Link href={'/signup'} className='text-B2R14 underline'>
          회원가입
        </Link>
      </div>
    </form>
  );
}
