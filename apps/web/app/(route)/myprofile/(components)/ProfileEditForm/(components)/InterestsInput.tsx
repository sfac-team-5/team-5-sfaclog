import { Check } from '@repo/ui/Check';
import InputTitle from './InputTitle';

interface InterestsInputProps {
  setValue: any;
  errors: any;
  watch: any;
}

const interestsList = [
  { label: '프론트엔드', value: 'Frontend' },
  { label: '백엔드', value: 'Backend' },
  { label: '데이터 분석', value: 'Data' },
  { label: '서버 개발', value: 'Server' },
  { label: 'DBA', value: 'DBA' },
  { label: 'iOS 개발', value: 'iOS' },
  { label: '안드로이드 개발', value: 'Android' },
];

function InterestsInput({ setValue, errors, watch }: InterestsInputProps) {
  const handleValueChange = (value: string) => {
    setValue('nickname', value);
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
            onChange={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default InterestsInput;
