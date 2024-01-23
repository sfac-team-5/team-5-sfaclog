// import React from 'react';
// import { notFound } from 'next/navigation';

// async function LogDetailPage({ params }: { params: { id: string } }) {
//   const response = await fetch(`http://localhost:3000/api/pocket/${params.id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch data'); //error page
//   }
//   const data = await response.json();
//   if (!data) notFound();
//   console.log('data', data);
//   // const data = await result.json();
//   // console.log(data);
//   // if (data.status === 404) notFound(); //not found page

//   return <div>{data.title}</div>;
// }

// export default LogDetailPage;
