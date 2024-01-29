import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AgreementInputProps {
  register: UseFormRegisterReturn<'agreement'>;
}

function AgreementInput({ register }: AgreementInputProps) {
  return <input {...register} type='checkbox' />;
}

export default AgreementInput;
