import React from 'react';
import { notFound } from 'next/navigation';

async function LogDetailPage({ params }: { params: { id: string } }) {
  const result = await fetch(`http://localhost:3000/api/log/${params.id}`);
  // console.log('result.status', result.status);
  console.log('result', result);
  if (result.status === 500) notFound();
  // if (!result.ok) {
  //   throw new Error('Failed to fetch data'); //error page
  // }
  const data = await result.json();
  console.log('data', data);
  // const data = await result.json();
  // console.log(data);
  // if (data.status === 404) notFound(); //not found page

  return <div>{data.title}</div>;
}

export default LogDetailPage;
