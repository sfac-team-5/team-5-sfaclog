import React from 'react';
import { IconRadioBoxBlue, IconRadioBoxGray } from '../public/svgs';

interface RadioButtonsProps {
  type: 'check' | 'circle';
  data: { id: number; value: string; isChecked?: boolean }[];
  name: string;
  onChange: (data: any) => void;
}

export function RadioButtons({
  type,
  data,
  name,
  onChange,
}: RadioButtonsProps) {
  return (
    <div className='flex gap-9'>
      {data.map(radio => (
        <label
          key={radio.id}
          htmlFor={radio.value}
          className='flex items-center gap-[10px]'
        >
          <input
            type='radio'
            name={name}
            value={radio.value}
            id={radio.value}
            onChange={e => onChange(e.target.value)}
            className='hidden'
          />
          <div className='size-6'>
            {radio.isChecked ? <IconRadioBoxBlue /> : <IconRadioBoxGray />}
          </div>
          <span className='text-B1R16 text-text-secondary'>{radio.value}</span>
        </label>
      ))}
    </div>

    // <label htmlFor={'1'} className='flex items-center'>
    //   <input
    //     type='radio'
    //     name={name}
    //     value={1}
    //     id={'1'}
    //     onChange={e => onChange(e.target.value)}
    //     className='hidden'
    //   />
    //   <div className='size-6'>
    //     <IconRadioBoxBlue />
    //   </div>
    //   <span className='text-B1R16 text-text-secondary'>{'공개여부'}</span>
    // </label>
  );
}
