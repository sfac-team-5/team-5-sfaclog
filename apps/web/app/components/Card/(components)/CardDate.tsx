interface CardDateProps {
  date: string;
}

export function CardDate({ date }: CardDateProps) {
  return <span>{date}</span>;
}
