interface CardCategoryProps {
  category: string;
}

export function CardCategory({ category }: CardCategoryProps) {
  return <span>{category ? category : '카테고리명'}</span>;
}
