import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface NameInputProps {
  register: UseFormRegisterReturn<'name'>;
  errors: FieldErrors | undefined;
}

function NameInput({ register, errors }: NameInputProps) {
  return (
    <input
      {...register}
      type='text'
      placeholder='이름'
      className={`border px-2 py-1 outline-none ${errors?.name ? 'border-red-500' : ''}`}
    />
  );
}

export default NameInput;
