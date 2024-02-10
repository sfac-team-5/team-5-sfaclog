import React from 'react';
import { UserProfileCard } from '@/components/Profile/UserProfileCard';
import { MyProfileCard } from '@/components/Profile/MyProfileCard';

const getUserInfo = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`,
    { cache: 'no-cache' },
  );
  if (!response.ok) return {};
  const result = await response.json();
  return result;
};

export default async function page() {
  const user = await getUserInfo('an6xvwgrbnfcsu8');
  return (
    <div className='flex justify-center gap-40'>
      <UserProfileCard user={user} />
      <MyProfileCard user={user} />
    </div>
  );
}
