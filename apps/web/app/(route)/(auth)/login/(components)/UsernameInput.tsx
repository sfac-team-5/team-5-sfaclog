import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface UsernameInputProps {
  register: UseFormRegisterReturn<'username'>;
  errors: FieldErrors | undefined;
}

function UsernameInput({ register, errors }: UsernameInputProps) {
  return (
    <input
      {...register}
      type='text'
      className={`rounded-md border-[1px] border-[#B3B3B3] w-[400px] px-4 py-[10px] h-[40px] outline-none ${errors?.username ? 'border-red-500' : ''}`}
    />
  );
}

export default UsernameInput;
