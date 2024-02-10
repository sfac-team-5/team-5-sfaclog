import { useState } from 'react';
import InputTitle from './InputTitle';
import { InputBox } from '@repo/ui/InputBox';

interface PhoneInputProps {
  setValue: any;
  errors: any;
}

function PhoneInput({ setValue, errors }: PhoneInputProps) {
  const [telecom, setTelecom] = useState('SKT');

  const handleValueChange = (value: string) => {
    setValue('phone', value);
  };

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='휴대폰 인증' />
      <div className='grid grid-cols-4 gap-2'>
        <button
          className={`h-10 rounded-md ${telecom === 'SKT' ? 'bg-brand-90 text-white' : 'bg-neutral-5 text-neutral-100'}`}
          onClick={() => setTelecom('SKT')}
        >
          SKT
        </button>
        <button
          className={`h-10 rounded-md ${telecom === 'KT' ? 'bg-brand-90 text-white' : 'bg-neutral-5 text-neutral-100'}`}
          onClick={() => setTelecom('KT')}
        >
          KT
        </button>
        <button
          className={`h-10 rounded-md ${telecom === 'LG U+' ? 'bg-brand-90 text-white' : 'bg-neutral-5 text-neutral-100'}`}
          onClick={() => setTelecom('LG U+')}
        >
          LG U+
        </button>
        <button
          className={`h-10 rounded-md ${telecom === '알뜰폰' ? 'bg-brand-90 text-white' : 'bg-neutral-5 text-neutral-100'}`}
          onClick={() => setTelecom('알뜰폰')}
        >
          알뜰폰
        </button>
      </div>
      <div className='flex gap-2'>
        <div className='w-[250px]'>
          <InputBox
            placeholder='휴대폰 번호를 입력해 주세요.'
            onValueChange={handleValueChange}
          />
        </div>
        <button className='bg-neutral-5 rounded-md px-6'>인증 번호 전송</button>
      </div>
      <InputBox
        placeholder='인증 번호를 입력해 주세요.'
        errorMessage={errors.phone?.message}
      />
    </div>
  );
}

export default PhoneInput;
