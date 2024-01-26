'use client';
import React from 'react';
import { submitAction } from './action';
import { useForm } from 'react-hook-form';

export interface LoginInputType {
  username: string;
  password: string;
}

export default function page() {
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
    } else if (!data.password) {
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
      console.log('로그인 성공');
    } else {
      console.log('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='mb-6  relative'>
        <input
          {...register('username')}
          type='text'
          className={`rounded-md border-[1px] border-[#B3B3B3] w-[400px] px-4 py-[10px] h-[40px] outline-none ${errors.id ? 'border-red-500' : ''}`}
        />
        {errors.username && (
          <div className='absolute text-red-500'>{errors.username.message}</div>
        )}
      </div>
      <div className='mb-6 relative'>
        <input
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
          })}
          type='password'
          className={`rounded-md border-2 w-[400px] h-[40px] px-4 py-[10px] outline-none ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && (
          <div className='absolute text-red-500'>{errors.password.message}</div>
        )}
      </div>
      <button type='submit' className='border-4 border-primary-50 w-28'>
        제출
      </button>
    </form>
  );
}
