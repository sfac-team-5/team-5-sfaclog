import React from 'react';

interface FollowingLogsProps {
  user: string;
}

async function FollowingLogs({ user }: FollowingLogsProps) {
  const resultList = await fetch('http://localhost:3000/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sorted: 'following', user }),
  });
  const data = await resultList.json();

  console.log(
    '--------------------------------팔로우순--------------------------------',
  );
  console.log(data);

  return <div>여기다</div>;
}

export default FollowingLogs;
