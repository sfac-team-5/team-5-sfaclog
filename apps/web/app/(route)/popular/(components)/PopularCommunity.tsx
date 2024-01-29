import React from 'react';
import NotFound from '../../../not-found';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function PopularCommunity() {
  const popularLogs = await fetchData();
  if (popularLogs.length === 0) return NotFound();

  return <div>PopularLogs</div>;
}

export default PopularCommunity;
