import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ImagesInputProps {
  register: UseFormRegisterReturn<'thumbnail'>;
}

function ImagesInput({ register }: ImagesInputProps) {
  return <input {...register} type='file' />;
}

export default ImagesInput;
