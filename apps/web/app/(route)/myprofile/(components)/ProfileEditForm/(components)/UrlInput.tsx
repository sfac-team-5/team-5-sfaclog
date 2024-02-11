interface UrlInputProps {
  setValue: any;
  errors: any;
  watch: any;
}

function UrlInput({ setValue, errors, watch }: UrlInputProps) {
  const handleValueChange = (value: string) => {
    setValue('nickname', value);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='border-neutral-70 flex h-10 w-full rounded-md border'>
        <div className='bg-neutral-70 text-B2R14 flex h-full w-[124px] items-center justify-center text-white'>
          sfaclog.kr/
        </div>
        <input
          type='text'
          value={'userURL'}
          className='text-B2R14 text-neutral-70 w-[calc(100%-130px)] p-2.5 outline-none'
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default UrlInput;
