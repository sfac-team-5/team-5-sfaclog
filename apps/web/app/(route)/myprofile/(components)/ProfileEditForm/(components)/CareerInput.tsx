import { useEffect, useState } from 'react';
import { InputBox } from '@repo/ui/InputBox';
import InputTitle from './InputTitle';
import InputAddButton from './InputAddButton';
import {
  IconCancelBoxGray,
  IconCheckBoxSquareFalse,
  IconCheckBoxSquareTrue,
} from '@repo/ui/Icon';

interface CareerInputProps {
  setValue: any;
  errors: any;
  inputValues: any;
}

function CareerInput({ setValue, errors, inputValues }: CareerInputProps) {
  const [careerInputs, setCareerInputs] = useState([
    { from: '', to: '', status: false, company: '' },
  ]);
  const maxInputs = 5; // 최대 입력 가능한 경력 사항 개수

  const addInput = () => {
    if (careerInputs.length < maxInputs) {
      setCareerInputs([
        ...careerInputs,
        { from: '', to: '', status: false, company: '' },
      ]);
    }
  };

  const removeInput = (index: number) => {
    if (careerInputs.length === 1) {
      setCareerInputs([{ from: '', to: '', status: false, company: '' }]);
    } else {
      setCareerInputs(careerInputs.filter((_, i) => i !== index));
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedInputs = careerInputs.map((input, i) =>
      i === index ? { ...input, [field]: value } : input,
    );
    setCareerInputs(updatedInputs);
    setValue(`career[${index}].${field}`, value); // react-hook-form 상태 업데이트
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (index: number, checked: boolean) => {
    handleInputChange(index, 'status', checked); // 체크박스 상태 업데이트
  };

  // careerInputs 초기 값 설정
  useEffect(() => {
    if (Array.isArray(inputValues) && inputValues.length > 0) {
      setCareerInputs(inputValues);
    }
  }, [inputValues]);

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='경력사항' />

      {careerInputs.map((input, index) => (
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
                  id='employmentStatus'
                  name='employmentStatus'
                  checked={input.status}
                  onChange={e => handleCheckboxChange(index, e.target.checked)}
                />
                <label
                  htmlFor='employmentStatus'
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

      {errors.career && <p>{errors.career.from.message}</p>}

      {careerInputs.length < maxInputs && <InputAddButton onClick={addInput} />}
      {careerInputs.length >= maxInputs && (
        <div className='text-B3R12 text-brand-100'>
          최대 5개까지 입력할 수 있어요.
        </div>
      )}
    </div>
  );
}

export default CareerInput;
