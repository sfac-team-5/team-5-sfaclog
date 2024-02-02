import React from 'react';
import { NoData } from '@/components/NoData';

interface MyLogProps {
  userId: string;
}

async function fetchData(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/logs`,
  );
  if (!response.ok) return [];
  return response.json();
}

async function MyLog({ userId }: MyLogProps) {
  const myLog = await fetchData(userId);
  if (myLog.length === 0) return NoData();

  return <div>MyLog</div>;
}

export default MyLog;
