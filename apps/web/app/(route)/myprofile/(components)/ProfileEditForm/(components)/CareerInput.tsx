import { InputBox } from '@repo/ui/InputBox';
import InputTitle from './InputTitle';
import InputAddButton from './InputAddButton';
import {
  IconCancelBoxGray,
  IconCheckBoxSquareFalse,
  IconCheckBoxSquareTrue,
} from '@repo/ui/Icon';
import { CareerType } from '@/types';

interface CareerInputProps {
  setValue: any;
  setError: any;
  clearErrors: any;
  errors: any;
  watch: any;
}

function CareerInput({
  setValue,
  setError,
  clearErrors,
  errors,
  watch,
}: CareerInputProps) {
  const watchedCareerInputs = (watch('career') as CareerType[]) || [];
  const maxInputs = 5; // 최대 입력 가능한 경력 사항 개수

  const addInput = () => {
    const newInputs = [
      ...watchedCareerInputs,
      { from: '', to: '', status: false, company: '' },
    ];
    if (newInputs.length <= maxInputs) {
      setValue('career', newInputs);
    }
  };

  const removeInput = (index: number) => {
    const newInputs = watchedCareerInputs.filter((_, i) => i !== index);
    setValue('career', newInputs);
  };

  const validateDate = (date: string) => /^\d{4}-\d{2}$/.test(date);

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    index: number,
    field: keyof CareerType,
    value: any,
  ) => {
    const newInputs = watchedCareerInputs.map((input: CareerType, i: number) =>
      i === index ? { ...input, [field]: value } : input,
    );
    setValue('career', newInputs);

    if (field === 'from' || field === 'to') {
      if (!validateDate(value)) {
        setError(`career[${index}].${field}`, {
          type: 'manual',
          message: "날짜 형식은 'YYYY-MM'이어야 합니다.",
        });
      } else {
        clearErrors(`career[${index}].${field}`);
      }
    }
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (index: number, checked: boolean) => {
    handleInputChange(index, 'status', checked); // 체크박스 상태 업데이트
  };

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='경력사항' />

      {watchedCareerInputs.map((input: CareerType, index: number) => (
        <div
          key={index}
          className='flex w-full flex-col gap-2 rounded-md bg-[#F6F7FB] p-5'
        >
          <div className='flex items-start justify-between'>
            <div className='flex items-center'>
              <div className='w-[86px]'>
                <InputBox
                  placeholder='2024.02'
                  value={input.from}
                  onChange={e =>
                    handleInputChange(index, 'from', e.target.value)
                  }
                />
              </div>
              <span className='mx-1.5'>-</span>
              <div className='w-[86px]'>
                <InputBox
                  placeholder='2024.02'
                  value={input.to}
                  onChange={e => handleInputChange(index, 'to', e.target.value)}
                />
              </div>

              <div className='ml-4'>
                <input
                  type='checkbox'
                  className='hidden'
                  id={`employmentStatus-${index}`}
                  name='employmentStatus'
                  checked={input.status}
                  onChange={e => handleCheckboxChange(index, e.target.checked)}
                />
                <label
                  htmlFor={`employmentStatus-${index}`}
                  className='flex items-center gap-1.5'
                >
                  {input.status ? (
                    <IconCheckBoxSquareTrue />
                  ) : (
                    <IconCheckBoxSquareFalse />
                  )}
                  <p className='text-B4R12 text-neutral-90'>재직 중</p>
                </label>
              </div>
            </div>

            <IconCancelBoxGray
              className='-mt-1 cursor-pointer'
              onClick={() => removeInput(index)}
            />
          </div>

          <InputBox
            placeholder='회사명과 부서명/직책을 입력해 주세요.'
            value={input.company}
            onChange={e => handleInputChange(index, 'company', e.target.value)}
          />
        </div>
      ))}

      {errors.career && (
        <p className='text-B3R12 text-text-waring'>{errors.career.message}</p>
      )}

      {watchedCareerInputs.length < maxInputs && (
        <InputAddButton onClick={addInput} />
      )}
      {watchedCareerInputs.length >= maxInputs && (
        <div className='text-B3R12 text-brand-100'>
          최대 5개까지 입력할 수 있어요.
        </div>
      )}
    </div>
  );
}

export default CareerInput;
