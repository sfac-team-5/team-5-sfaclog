import React from 'react';
import { NoData } from '@/components/NoData';

async function fetchData(user: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=following&user=${user}`,
  );
  if (!response.ok) return [];
  return response.json();
}

async function FollowingLogs() {
  const user = 'an6xvwgrbnfcsu8';
  const followingLogs = await fetchData(user);
  if (followingLogs.length === 0) return NoData();

  return <div>팔로잉</div>;
}

export default FollowingLogs;
