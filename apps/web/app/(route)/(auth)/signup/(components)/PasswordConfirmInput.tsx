import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface PasswordConfirmInputProps {
  register: UseFormRegisterReturn<'passwordConfirm'>;
  errors: FieldErrors | undefined;
}

function PasswordConfirmInput({ register, errors }: PasswordConfirmInputProps) {
  return (
    <input
      {...register}
      type='password'
      placeholder='비밀번호 확인'
      className={`border px-2 py-1 outline-none ${errors?.passwordConfirm ? 'border-red-500' : ''}`}
    />
  );
}

export default PasswordConfirmInput;
