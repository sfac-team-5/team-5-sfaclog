export interface CountProps {
  count: number;
}

export function CardLikes({ count }: CountProps) {
  return <div>{count}</div>;
}
