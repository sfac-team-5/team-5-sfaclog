import { Check } from '@repo/ui/Check';
import InputTitle from './InputTitle';

interface OffersInputProps {
  setValue: any;
  watch: any;
}

const offersList = [
  { label: '채용 제안', value: 'Recruitment' },
  { label: '의견 제안', value: 'Opinion' },
  { label: '프로젝트 제안', value: 'Project' },
];

function OffersInput({ setValue, watch }: OffersInputProps) {
  const offers = watch('offers');

  // 체크박스 변경 핸들러
  const handleCheckChange = ({
    value,
    checked,
  }: {
    value: string;
    checked: boolean;
  }) => {
    const newCheckedValues = checked
      ? [...offers, value] // 체크된 경우, 배열에 추가
      : offers.filter((item: string) => item !== value); // 체크 해제된 경우, 배열에서 제거

    setValue('offers', newCheckedValues);
  };

  console.log(offers);

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
            checked={offers.includes(item.value)}
            onChange={handleCheckChange}
          />
        ))}
      </div>
    </div>
  );
}

export default OffersInput;
