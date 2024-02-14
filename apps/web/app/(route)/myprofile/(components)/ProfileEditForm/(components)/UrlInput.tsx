interface UrlInputProps {
  register: any;
  errors: any;
}

function UrlInput({ register, errors }: UrlInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='border-neutral-70 flex h-10 w-full rounded-md border'>
        <div className='bg-neutral-70 text-B2R14 flex h-full w-[124px] items-center justify-center text-white'>
          sfaclog.kr/
        </div>
        <input
          {...register('pageUrl', {
            required: 'URL은 필수입니다.',
          })}
          type='text'
          className='text-B2R14 text-neutral-70 w-[calc(100%-130px)] p-2.5 outline-none'
        />
      </div>

      {errors.pageUrl && (
        <p className='text-B3R12 text-text-waring'>{errors.pageUrl.message}</p>
      )}
    </div>
  );
}

export default UrlInput;
