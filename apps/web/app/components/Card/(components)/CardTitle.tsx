interface CardTitleProps {
  title: string;
}

export function CardTitle({ title }: CardTitleProps) {
  return <div className='font-bold'>{title}</div>;
}
