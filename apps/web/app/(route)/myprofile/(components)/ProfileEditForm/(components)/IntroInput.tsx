import InputTitle from './InputTitle';

interface IntroInputProps {
  register: any;
  errors: any;
}

function IntroInput({ register, errors }: IntroInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <InputTitle label='소개' />
      <textarea
        {...register('intro', {
          maxLength: {
            value: 300,
            message: '닉네임은 300자 이하여야 합니다.',
          },
        })}
        placeholder='간단한 자기 소개를 입력해 주세요.'
        maxLength={300}
        className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray h-[104px] w-full resize-none rounded-md border px-4 py-2.5 outline-none ${errors.intro?.message ? 'border-highlight-warning caret-highlight-warning focus:border-highlight-warning' : 'border-stroke-30 focus:border-stroke-50'}`}
      />
      <p className='text-B3R12 text-[#4c4c4c]'>300자 내로 작성해 주세요.</p>
    </div>
  );
}

export default IntroInput;
