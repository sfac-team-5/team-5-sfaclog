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
  inputValues: any;
}

function InterestsInput({ setValue, inputValues }: InterestsInputProps) {
  const [checkedValues, setCheckedValues] = useState(inputValues || []);

  // 체크박스 변경 핸들러
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
      ? [...checkedValues, value] // 체크된 경우, 배열에 추가
      : checkedValues.filter((item: string) => item !== value); // 체크 해제된 경우, 배열에서 제거

    setCheckedValues(newCheckedValues);
    setValue(name, newCheckedValues);
  };

  useEffect(() => {
    // 초기 값 또는 props 변경에 따른 상태 업데이트
    setCheckedValues(inputValues);
  }, [inputValues, setValue]);

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
            checked={checkedValues.includes(item.value)}
            onChange={handleCheckChange}
          />
        ))}
      </div>
    </div>
  );
}

export default InterestsInput;
