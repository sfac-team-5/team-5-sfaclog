export function MessageIncoming({ message }: { message: string }) {
  return (
    <div className='mb-[15px] flex w-full items-end justify-start gap-1'>
      <div className='bg-neutral-5 text-B3R12 text-neutral-90 flex min-h-[34px] min-w-5 max-w-[250px] items-center rounded-md rounded-bl-none p-2'>
        {message}
      </div>
      <div className='text-neutral-40 text-[8px]'>
        <p>읽음</p>
        <p>오후 3:5</p>
      </div>
    </div>
  );
}
