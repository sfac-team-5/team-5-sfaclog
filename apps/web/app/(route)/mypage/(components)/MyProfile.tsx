import React from 'react';
import NotFound from '../../../not-found';

interface MyProfileProps {
  userId: string;
}
async function fetchData(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
  );
  if (!response.ok) return null;
  return response.json();
}

async function MyProfile({ userId }: MyProfileProps) {
  const profile = await fetchData(userId);
  if (!profile) return NotFound();

  return <div>MyProfile</div>;
}

export default MyProfile;