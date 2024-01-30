'use client';
import { InputBox } from '@repo/ui/InputBox';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function page() {
  const [verifiedMessage, setVerifiedMessage] = useState<string | null>(null);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { text: '', password: '' },
  });

  const textRegister = register('text');
  const passwordRegister = register('password');

  const handleVerifyButton = () => {
    setVerifiedMessage('인증 완료');
    clearErrors('text');
  };

  const handleErrorButton = () => {
    setVerifiedMessage(null);
    setError('text', { message: '에러' });
  };

  const handleClearButton = () => {
    setVerifiedMessage(null);
    clearErrors('text');
  };

  console.log(watch('text'), watch('password'));

  return (
    <div className='h-80 space-y-3 p-2'>
      <div className='ml-48'>Input Boxes PAGE</div>
      <InputBox
        placeholder='placeholder'
        verifiedMessage={verifiedMessage}
        errorMessage={errors.text?.message}
        onChange={value => setValue('text', value)}
      />
      <div className='space-x-4'>
        <button
          className='rounded-lg border px-2 py-1'
          onClick={handleVerifyButton}
        >
          verify
        </button>
        <button
          className='rounded-lg border px-2 py-1'
          onClick={handleErrorButton}
        >
          error
        </button>
        <button
          className='rounded-lg border px-2 py-1'
          onClick={handleClearButton}
        >
          clear
        </button>
      </div>
      <InputBox
        type='password'
        placeholder='password'
        onChange={value => setValue('password', value)}
      />
    </div>
  );
}
