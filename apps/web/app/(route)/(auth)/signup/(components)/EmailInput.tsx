import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface EmailInputProps {
  register: UseFormRegisterReturn<'email'>;
  errors: FieldErrors | undefined;
}

function EmailInput({ register, errors }: EmailInputProps) {
  return (
    <input
      {...register}
      type='text'
      placeholder='이메일'
      className={`border px-2 py-1 outline-none ${errors?.email ? 'border-red-500' : ''}`}
    />
  );
}

export default EmailInput;
