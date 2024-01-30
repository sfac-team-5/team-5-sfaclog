interface CardBoxProps {
  children: React.ReactNode;
}

export function CardBox({ children }: CardBoxProps) {
  return (
    <div className='background-white shadow-custom flex cursor-pointer flex-col items-start gap-3 rounded-md p-3'>
      {children}
    </div>
  );
}
