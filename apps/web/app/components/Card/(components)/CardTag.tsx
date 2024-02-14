interface CardTagProps {
  tag: string;
}

export function CardTag({ tag }: CardTagProps) {
  return (
    <span className='text-B3R12 text-neutral-70 inline-block rounded-full bg-[#EFF3FA] px-2 py-1'>
      #{tag}
    </span>
  );
}
