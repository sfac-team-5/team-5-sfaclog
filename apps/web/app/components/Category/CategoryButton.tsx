import Link from 'next/link';

interface CategoryButtonProps {
  title: string;
  className?: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pageType?: 'popular' | 'recently';
}

function CategoryButton({
  title,
  className,
  active,
  onClick,
  pageType,
}: CategoryButtonProps) {
  return (
    <Link href={`/${pageType}?category=${title}`}>
      <button
        className={`text-label1 text-text-alternative h-10 rounded-full border px-6 transition-all ${className} ${
          active
            ? 'bg-brand-100 border-none text-white'
            : 'border-brand-100 text-brand-100 bg-white'
        } hover:bg-brand-100 transition-all duration-300 hover:text-white`}
        onClick={onClick}
      >
        {title}
      </button>
    </Link>
  );
}

export default CategoryButton;
