export interface CountProps {
  count: number;
}

export function CardComments({ count }: CountProps) {
  return <div>{count}</div>;
}
