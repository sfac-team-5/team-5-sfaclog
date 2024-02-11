import { useEffect, useState } from 'react';
import { Check } from '@repo/ui/Check';
import InputTitle from './InputTitle';

const interestsList = [
  { label: '프론트엔드', value: 'Frontend' },
  { label: '백엔드', value: 'Backend' },
  { label: '데이터 분석', value: 'Data' },
  { label: '서버 개발', value: 'Server' },
  { label: 'DBA', value: 'DBA' },
  { label: 'iOS 개발', value: 'iOS' },
  { label: '안드로이드 개발', value: 'Android' },
];

interface InterestsInputProps {
  setValue: any;
  watch: any;
}

function InterestsInput({ setValue, watch }: InterestsInputProps) {
  const interests = watch('interests');

  const handleCheckChange = ({
    name,
    value,
    checked,
  }: {
    name: string;
    value: string;
    checked: boolean;
  }) => {
    const newCheckedValues = checked
      ? [...interests, value] // 체크된 경우, 배열에 추가
      : interests.filter((item: string) => item !== value); // 체크 해제된 경우, 배열에서 제거

    setValue('interests', newCheckedValues);
  };

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='관심 분야' />

      <div className='grid grid-cols-2'>
        {interestsList.map(item => (
          <Check
            key={item.value}
            name='interests'
            value={item.value}
            label={item.label}
            checked={interests.includes(item.value)}
            onChange={handleCheckChange}
          />
        ))}
      </div>
    </div>
  );
}

export default InterestsInput;
