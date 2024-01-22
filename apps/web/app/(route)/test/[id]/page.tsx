import React from 'react';
import { notFound } from 'next/navigation';

async function Page({ params }: { params: { id: string } }) {
  const result = await fetch(`http://localhost:3000/api/pocket/${params.id}`, {
    cache: 'no-cache',
  });
  // console.log('result.status', result.status);
  if (!result.ok) {
    throw new Error('Failed to fetch data'); //error page
  }
  const data = await result.json();
  if (!data) notFound();

  return <div>{data.title}</div>;
}

export default Page;
