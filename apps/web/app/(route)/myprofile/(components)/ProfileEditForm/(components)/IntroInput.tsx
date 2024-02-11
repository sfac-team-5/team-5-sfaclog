import InputTitle from './InputTitle';

interface IntroInputProps {
  register: any;
}

function IntroInput({ register }: IntroInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <InputTitle label='소개' />
      <textarea
        {...register('intro')}
        placeholder='간단한 자기 소개를 입력해 주세요.'
        maxLength={300}
        className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray border-stroke-30 focus:border-stroke-50 h-[104px] w-full resize-none rounded-md border px-4 py-2.5 outline-none`}
      />
      <p className='text-B3R12 text-[#4c4c4c]'>300자 내로 작성해 주세요.</p>
    </div>
  );
}

export default IntroInput;
