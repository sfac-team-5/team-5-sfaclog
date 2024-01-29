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
      className={`rounded-md border-2 w-[400px] h-[40px] px-4 py-[10px] outline-none ${errors?.password ? 'border-red-500' : ''}`}
    />
  );
}

export default PasswordInput;
