import React from 'react';
import { notFound } from 'next/navigation';

async function LogDetailPage({ params }: { params: { id: string } }) {
  const result = await fetch(`http://localhost:3000/api/log/${params.id}`);
  const data = await result.json();

  if (data.code && data.code === 404) {
    notFound();
  }

  return <div>{data.title}</div>;
}

export default LogDetailPage;
