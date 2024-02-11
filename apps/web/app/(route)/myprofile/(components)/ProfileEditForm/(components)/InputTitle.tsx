import React from 'react';

interface InputTitleProps {
  label: string;
}

function InputTitle({ label }: InputTitleProps) {
  return <p className='text-B1M16 text-neutral-90'>{label}</p>;
}

export default InputTitle;
