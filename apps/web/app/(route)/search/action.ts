'use server';
export const getSearchResult = async (searchParams: {
  [key: string]: string;
}) => {
  const query = searchParams.query;
  const sorted = searchParams.sorted || 'recently';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search-result?query=${query}&sorted=${sorted}`,
    { cache: 'no-cache' },
  );
  const result = await response.json();
  return result;
};
