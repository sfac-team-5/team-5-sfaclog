import Link from 'next/link';

interface CategoryButtonProps {
  title: string;
  className?: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function CategoryButton({
  title,
  className,
  active,
  onClick,
}: CategoryButtonProps) {
  return (
    <Link href={`/popular?category=${title}`}>
      <button
        className={`text-label1 text-text-alternative rounded-full border px-[16px] py-[12px] transition-all ${className} ${
          active
            ? 'border-primary-heavy bg-primary-heavy text-white'
            : 'border-line-normal bg-white'
        } hover:bg-primary-heavy transition-all duration-300 hover:text-white`}
        onClick={onClick}
      >
        {title}
      </button>
    </Link>
  );
}

export default CategoryButton;
