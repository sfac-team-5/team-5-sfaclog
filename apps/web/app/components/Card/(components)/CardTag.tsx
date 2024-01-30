interface CardTagProps {
  tag: string;
}

export function CardTag({ tag }: CardTagProps) {
  return (
    <span className='bg-brand-10 text-B3R12 text-brand-100 inline-block rounded-full px-2 py-1'>
      #{tag}
    </span>
  );
}
