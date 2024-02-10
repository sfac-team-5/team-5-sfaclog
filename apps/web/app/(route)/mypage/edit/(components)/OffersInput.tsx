import { Check } from '@repo/ui/Check';
import InputTitle from './InputTitle';

interface OffersInputProps {
  setValue: any;
  errors: any;
}

const offersList = [
  { label: '채용 제안', value: 'Recruitment' },
  { label: '의견 제안', value: 'Opinion' },
  { label: '프로젝트 제안', value: 'Project' },
];

function OffersInput({ setValue, errors }: OffersInputProps) {
  const handleValueChange = (value: string) => {
    setValue('nickname', value);
  };

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
            onChange={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default OffersInput;
