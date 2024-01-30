export interface CountProps {
  count: number;
}

export function CardViews({ count }: CountProps) {
  return <div>{count}</div>;
}
