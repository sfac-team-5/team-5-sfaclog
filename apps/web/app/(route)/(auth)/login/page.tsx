'use client';
import React from 'react';
import { submitAction } from './action';
import { useForm } from 'react-hook-form';

export interface LoginInputType {
  id: string;
  password: string;
}

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginInputType) => {
    const { loginSuccess } = await submitAction(data);
    if (loginSuccess) {
      console.log('로그인 성공');
    } else {
      alert('다시 시도해 주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        {...register('id', {
          required: '아이디를 입력해 주세요.',
        })}
        type='text'
        className='border px-2 py-1'
      />
      <input
        {...register('password', {
          required: '비밀번호를 입력해 주세요.',
        })}
        type='password'
        className='border px-2 py-1'
      />
      <button type='submit'>제출</button>
    </form>
  );
}
