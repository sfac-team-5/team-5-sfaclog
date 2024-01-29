'use client';

import React, { useState } from 'react';
import { RadioButtons } from '@repo/ui/RadioButtons';

const data = [
  {
    id: 1,
    value: '동의',
    isChecked: false,
  },
  {
    id: 2,
    value: '매우동의',
    isChecked: false,
  },
  {
    id: 3,
    value: '비동의',
    isChecked: false,
  },
  {
    id: 4,
    value: '매우비동의',
    isChecked: false,
  },
];
export default function page() {
  const [radioData, setRadioData] = useState(data);
  const onRadioChange = (value: string) => {
    const newData = radioData.map(data => {
      if (data.value === value) {
        data.isChecked = true;
      } else {
        data.isChecked = false;
      }
      return data;
    });
    setRadioData(newData);
  };
  return (
    <div className='h-40 bg-slate-400'>
      <RadioButtons
        data={radioData}
        name='test'
        type='check'
        onChange={value => onRadioChange(value)}
      />
    </div>
  );
}
