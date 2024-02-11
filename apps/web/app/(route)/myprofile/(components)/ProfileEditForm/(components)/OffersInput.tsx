import { useEffect, useState } from 'react';
import { Check } from '@repo/ui/Check';
import InputTitle from './InputTitle';

interface OffersInputProps {
  setValue: any;
  inputValues: any;
}

const offersList = [
  { label: '채용 제안', value: 'Recruitment' },
  { label: '의견 제안', value: 'Opinion' },
  { label: '프로젝트 제안', value: 'Project' },
];

function OffersInput({ setValue, inputValues }: OffersInputProps) {
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
      <InputTitle label='제안 허용' />

      <div className='grid'>
        {offersList.map(item => (
          <Check
            key={item.value}
            name='offers'
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

export default OffersInput;
