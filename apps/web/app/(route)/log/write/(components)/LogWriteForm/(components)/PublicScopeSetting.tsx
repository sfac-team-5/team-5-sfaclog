import React, { useState } from 'react';
import { RadioButtons } from '@repo/ui/RadioButtons';
// import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

interface PublicScopeSettingProps {
  setValue: any;
}

const radioValue = [
  { id: 1, value: '전체공개', isChecked: true },
  { id: 2, value: '비공개' },
];

function PublicScopeSetting({ setValue }: PublicScopeSettingProps) {
  const [radioData, setRadioData] = useState(radioValue);
  const handleRadioButton = (value: string) => {
    const newRadioValue = radioData.map(data => {
      if (data.value === value) {
        data.isChecked = true;
      } else {
        data.isChecked = false;
      }
      return data;
    });
    if (value === '전체공개') {
      setValue('publicScope', true);
    } else {
      setValue('publicScope', false);
    }
    setRadioData(newRadioValue);
  };
  return (
    <div className='flex gap-[26px]'>
      <span className='text-text-secondary'>공개 범위</span>
      <RadioButtons
        type='circle'
        data={radioData}
        name='공개여부'
        onChange={handleRadioButton}
      />
    </div>
  );
}

export default PublicScopeSetting;
