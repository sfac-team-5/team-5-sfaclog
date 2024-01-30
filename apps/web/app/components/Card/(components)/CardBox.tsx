interface CardBoxProps {
  children: React.ReactNode;
  type: 'log' | 'community';
}

export function CardBox({ children, type }: CardBoxProps) {
  return (
    <div
      className={`background-white shadow-custom flex cursor-pointer items-start rounded-md ${type == 'log' ? 'flex-col gap-3 p-3' : 'p-6 pr-10'}`}
    >
      {children}
    </div>
  );
}
