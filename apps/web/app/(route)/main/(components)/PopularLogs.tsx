import React from 'react';
import NotFound from '../../../not-found';

async function fetchData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
}

async function PopularLogs() {
  const popularLogs = await fetchData();
  if (popularLogs.length === 0) return NotFound();

  return <div>PopularLogs</div>;
}

export default PopularLogs;
