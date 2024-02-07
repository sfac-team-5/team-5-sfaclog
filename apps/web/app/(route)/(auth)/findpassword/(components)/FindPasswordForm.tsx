'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputBox } from '@repo/ui/InputBox';
import Button from '@repo/ui/Button';

interface FindPasswordType {
  username: string;
  email: string;
}

function FindPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FindPasswordType>({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const nameRegister = register('username', {
    required: '이름을 입력해주세요',
  });
  const emailRegister = register('email', {
    required: '이메일을 입력해주세요',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/i,
      message: '이메일 형식을 확인해 주세요.',
    },
  });
  const submitFindPassword = async (data: FindPasswordType) => {
    //비빌번호 재설정 이메일 보내기
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/findpassword`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      setError('email', { message: '이름 또는 이메일이 올바르지 않습니다.' });
      setError('username', {
        message: '이름 또는 이메일이 올바르지 않습니다.',
      });
      return;
    }
    return router.push(`/findpassword/verify?email=${data.email}`);
  };
  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(submitFindPassword)}
    >
      <div className='flex flex-col gap-3'>
        <p className='text-B1B16'>이름</p>
        <InputBox
          placeholder='이름을 입력해주세요.'
          errorMessage={errors.username?.message}
          onValueChange={username => setValue('username', username)}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-B1M16'>이메일 인증</p>
        <div className='flex w-full gap-3'>
          <div className='flex grow flex-col gap-2'>
            <InputBox
              placeholder='이메일 주소를 입력해주세요.'
              errorMessage={errors.email?.message}
              onValueChange={email => setValue('email', email)}
            />
            <p className='text-B3R12 text-neutral-40'>
              이메일 예시: abcde123@gmail.com
            </p>
          </div>
        </div>
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
