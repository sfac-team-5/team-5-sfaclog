import React from 'react';

async function FollowingLogs() {
  const resultList = await fetch(
    'http://localhost:3000/api/log?sorted=following',
  );
  //   if (!resultList.ok) {
  //     throw new Error('Failed to fetch data');
  //   }
  const data = await resultList.json();

  console.log(
    '--------------------------------팔로우순--------------------------------',
  );
  console.log(data);

  return <div>여기다</div>;
}

export default FollowingLogs;
