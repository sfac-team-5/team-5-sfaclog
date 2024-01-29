import React from 'react';

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
    <div className='flex gap-[55px]'>
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
          />
          <div
            className={`size-5 rounded-full ${radio.isChecked ? 'bg-blue-600' : 'bg-red-600'}`}
          ></div>
          <span>{radio.value}</span>
        </label>
      ))}
    </div>
  );
}
