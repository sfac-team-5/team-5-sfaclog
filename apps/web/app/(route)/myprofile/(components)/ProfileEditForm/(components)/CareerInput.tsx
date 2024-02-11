import { Selectbox } from '@repo/ui/SelectBox';
import { InputBox } from '@repo/ui/InputBox';
import InputTitle from './InputTitle';
import InputAddButton from './InputAddButton';
import { Check } from '@repo/ui/Check';
import {
  IconCancelBoxGray,
  IconCheckBoxBlue,
  IconCheckBoxSquareFalse,
  IconCheckBoxSquareTrue,
} from '@repo/ui/Icon';
import { useState } from 'react';

interface CareerInputProps {
  setValue: any;
  errors: any;
  watch: any;
}

function CareerInput({ setValue, errors, watch }: CareerInputProps) {
  const [isEmploymentStatusChecked, setIsEmploymentStatusChecked] =
    useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmploymentStatusChecked(event.target.checked);
  };

  const handleValueChange = (value: string) => {
    setValue('sns', value);
  };

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='경력사항' />

      <div className='flex w-full flex-col gap-2 rounded-md bg-[#F6F7FB] p-5'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center'>
            <div className='w-[86px]'>
              <InputBox placeholder='2024.02' />
            </div>
            <span className='mx-1.5'>-</span>
            <div className='w-[86px]'>
              <InputBox placeholder='2024.02' />
            </div>

            <div className='ml-4'>
              <input
                type='checkbox'
                className='hidden'
                id='employmentStatus'
                name='employmentStatus'
                checked={isEmploymentStatusChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor='employmentStatus'
                className='flex items-center gap-1.5'
              >
                {isEmploymentStatusChecked ? (
                  <IconCheckBoxSquareTrue />
                ) : (
                  <IconCheckBoxSquareFalse />
                )}
                <p className='text-B4R12 text-neutral-90'>재직 중</p>
              </label>
            </div>
          </div>

          <IconCancelBoxGray className='-mt-1 cursor-pointer' />
        </div>

        <InputBox placeholder='회사명과 부서명/직책을 입력해 주세요.' />
      </div>

      <InputAddButton />
    </div>
  );
}

export default CareerInput;
