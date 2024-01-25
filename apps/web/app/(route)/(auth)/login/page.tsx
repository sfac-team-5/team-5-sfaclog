'use client';
import React from 'react';
import { submitAction } from './action';
import { useForm } from 'react-hook-form';

export interface formDataProps {
  id: string;
  password: string;
}

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: formDataProps) => {
    await submitAction(data);
  };

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pocket`, {
  //     method: 'POST',
  //     body: JSON.stringify(formData),
  //   });
  // };

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
