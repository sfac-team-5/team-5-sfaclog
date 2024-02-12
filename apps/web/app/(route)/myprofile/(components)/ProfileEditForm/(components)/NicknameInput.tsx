import { InputBox } from '@repo/ui/InputBox';
import InputTitle from './InputTitle';

interface NicknameInputProps {
  errors: any;
  register: any;
}

function NicknameInput({ register, errors }: NicknameInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <InputTitle label='닉네임' />
      <InputBox
        placeholder='2~8자 이하로 입력해 주세요.'
        {...register('nickname', {
          required: '닉네임은 필수입니다.',
          minLength: {
            value: 2,
            message: '닉네임은 2자 이상이어야 합니다.',
          },
          maxLength: {
            value: 18,
            message: '닉네임은 18자 이하여야 합니다.',
          },
        })}
        errorMessage={errors.nickname?.message}
      />
    </div>
  );
}

export default NicknameInput;
