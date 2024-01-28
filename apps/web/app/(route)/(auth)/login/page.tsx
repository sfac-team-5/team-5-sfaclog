'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { submitAction } from './action';
import { useRouter } from 'next/navigation';

export interface LoginInputType {
  username: string;
  password: string;
}

export default function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginInputType) => {
    if (!data.username) {
      setError(
        'username',
        {
          message: '아이디를 입력해주세요',
        },
        { shouldFocus: true },
      );
    }
    if (!data.password) {
      setError(
        'password',
        {
          message: '비밀번호를 입력해주세요',
        },
        { shouldFocus: true },
      );
    }

    const { loginSuccess } = await submitAction(data);

    if (loginSuccess) {
      router.refresh();
      alert('로그인되었습니다.');
      router.back();
    } else {
      console.log('다시 로그인해 주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='relative  mb-6'>
        <input
          {...register('username', {
            required: '아이디를 입력해 주세요.',
          })}
          type='text'
          className={`h-[40px] w-[400px] rounded-md border-[1px] border-[#B3B3B3] px-4 py-[10px] outline-none ${errors.username ? 'border-red-500' : ''}`}
        />
        {errors.username && (
          <div className='absolute text-red-500'>{errors.username.message}</div>
        )}
      </div>
      <div className='relative mb-6'>
        <input
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
          })}
          type='password'
          className={`h-[40px] w-[400px] rounded-md border-2 px-4 py-[10px] outline-none ${errors.password ? 'border-red-500' : ''}`}
        />
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
