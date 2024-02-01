export function MessageIncoming({ message }: { message: string }) {
  return (
    <div className='mb-4 flex w-full items-end justify-start gap-1'>
      <div className='bg-neutral-5 text-B3R12 text-neutral-90 min-w-5 max-w-[250px] rounded-md rounded-bl-none p-2'>
        {message}
      </div>
      <div className='text-neutral-40 text-[8px]'>
        <p>읽음</p>
        <p>오후 3:5</p>
      </div>
    </div>
  );
}
