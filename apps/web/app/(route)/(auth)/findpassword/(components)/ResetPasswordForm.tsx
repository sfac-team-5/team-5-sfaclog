'use client';

import Button from '@repo/ui/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { InputCustom } from '../../signup/(procedure)/signupform/Input';

interface ResetPasswordType {
  password: string;
  passwordConfirm: string;
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [checkPasswordConfirm, setPasswordConfirm] = useState(false);
  const [checkPwValidation, setCheckPwValidation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ResetPasswordType>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    if (!errors.password && password.length >= 8) {
      setCheckPwValidation(() => true);
    } else {
      setCheckPwValidation(() => false);
    }
  }, [errors.password]);

  const checkPasswordIsEqual = (value: string) => {
    if (password === value) {
      setPasswordConfirm(() => true);
      clearErrors('passwordConfirm');
      return true;
    } else {
      setPasswordConfirm(() => false);
      return false;
    }
  };

  const submitResetPassword = async (data: ResetPasswordType) => {
    if (!token) {
      alert('토큰이 없습니다');
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/findpassword/confirm`,
      {
        method: 'POST',
        body: JSON.stringify({ ...data, token }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      //나중에 오류처리 수정
      alert('오류가 발생했습니다');
      return;
    }
    return router.push('/');
  };
  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(submitResetPassword)}
    >
      <div className='flex w-[400px] flex-col gap-3'>
        <div className='text-B1M16'>새 비밀번호</div>
        <InputCustom
          type='password'
          hint={
            !password
              ? '8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다'
              : undefined
          }
          successMessage={
            checkPwValidation ? '사용가능한 비밀번호 입니다.' : undefined
          }
          errorMessage={errors.password?.message || undefined}
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            pattern: {
              value: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(.{8,})$/,
              message: '규칙에 맞지 않는 비밀번호 입니다.',
            },
            onChange: e => {
              if (
                e.target.value !== passwordConfirm &&
                passwordConfirm.length > 0
              ) {
                setError('passwordConfirm', {
                  message: '비밀번호가 일치 하지 않습니다.',
                });
              }
            },
          })}
        />
      </div>
      <div className='flex w-[400px] flex-col gap-3'>
        <div className='text-B1M16'>새 비밀번호 확인</div>
        <InputCustom
          type='password'
          errorMessage={errors.passwordConfirm?.message || undefined}
          successMessage={
            checkPasswordConfirm ? '비밀번호가 일치합니다.' : undefined
          }
          {...register('passwordConfirm', {
            required: '비밀번호를 한 번 더 입력해 주세요.',
            validate: value =>
              checkPasswordIsEqual(value) || '비밀번호가 일치 하지 않습니다.',
          })}
        />
      </div>

      <Button type='submit' label='확인' size='l' />
    </form>
  );
}
