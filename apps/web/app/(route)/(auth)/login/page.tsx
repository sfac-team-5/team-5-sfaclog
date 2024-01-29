'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { submitAction } from './action';
import { useRouter } from 'next/navigation';
import UsernameInput from './(components)/UsernameInput';
import PasswordInput from './(components)/PasswordInput';

export interface LoginInputType {
  username: string;
  password: string;
}

export default function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginInputType) => {
    const { loginSuccess } = await submitAction(data);

    if (loginSuccess) {
      router.refresh();
      alert('로그인되었습니다.');
      router.back();
    } else {
      console.log('다시 로그인해 주세요.');
    }
  };

  const usernameRegister = register('username', {
    required: '아이디를 입력해 주세요.',
  });

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해 주세요.',
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='mb-6 relative'>
        <UsernameInput register={usernameRegister} errors={errors} />
        {errors.username && (
          <div className='absolute text-red-500'>{errors.username.message}</div>
        )}
      </div>
      <div className='mb-6 relative'>
        <PasswordInput register={passwordRegister} errors={errors} />
        {errors.password && (
          <div className='absolute text-red-500'>{errors.password.message}</div>
        )}
      </div>
      <button type='submit' className='border-primary-50 w-28 border-4'>
        제출
      </button>
    </form>
  );
}
