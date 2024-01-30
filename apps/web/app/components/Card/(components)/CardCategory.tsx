interface CardCategoryProps {
  category: string;
}

export function CardCategory({ category }: CardCategoryProps) {
  return (
    <span className='text-brand-90 text-B3B12'>
      {category ? category : '카테고리명'}
    </span>
  );
}
