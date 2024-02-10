import InputTitle from './InputTitle';
import { InputBox } from '@repo/ui/InputBox';

interface NicknameInputProps {
  setValue: any;
  errors: any;
}

function NicknameInput({ setValue, errors }: NicknameInputProps) {
  const handleValueChange = (value: string) => {
    setValue('nickname', value);
  };

  return (
    <div className='flex flex-col gap-2'>
      <InputTitle label='닉네임' />
      <InputBox
        placeholder='2~8자 이하로 입력해 주세요.'
        onValueChange={handleValueChange}
        errorMessage={errors.nickname?.message}
      />
    </div>
  );
}

export default NicknameInput;
