export function MessageOutgoing({ message }: { message: string }) {
  return (
    <div className='mb-4 flex w-full items-end justify-end gap-1'>
      <div className='text-neutral-40 text-right text-[8px]'>
        <p>읽음</p>
        <p>오후 3:5</p>
      </div>
      <div className='bg-brand-90 text-B3R12 min-w-5 max-w-[250px] rounded-md rounded-br-none p-2 text-white'>
        {message}
      </div>
    </div>
  );
}
