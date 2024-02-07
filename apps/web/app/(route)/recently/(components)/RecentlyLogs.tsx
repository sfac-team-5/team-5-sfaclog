import React from 'react';
import { NoData } from '@/components/NoData';

async function fetchData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=recently`,
  );
  if (!response.ok) return [];
  return response.json();
}

async function RecentlyLogs() {
  const recentlyLogs = await fetchData();
  if (recentlyLogs.length === 0) return NoData();

  return <div>RecentlyLogs</div>;
}

export default RecentlyLogs;
