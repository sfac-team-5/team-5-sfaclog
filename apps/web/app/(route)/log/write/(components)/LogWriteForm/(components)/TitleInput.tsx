import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TitleInputProps {
  register: UseFormRegisterReturn<'title'>;
}

function TitleInput({ register }: TitleInputProps) {
  return <input {...register} className='border' />;
}

export default TitleInput;
