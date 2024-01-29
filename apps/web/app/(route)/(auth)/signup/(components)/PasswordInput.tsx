import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
  register: UseFormRegisterReturn<'password'>;
  errors: FieldErrors | undefined;
}

function PasswordInput({ register, errors }: PasswordInputProps) {
  return (
    <input
      {...register}
      type='password'
      placeholder='비밀번호'
      className={`border px-2 py-1 outline-none ${errors?.password ? 'border-red-500' : ''}`}
    />
  );
}

export default PasswordInput;
