import React from 'react';

interface ProfileSectionProps {
  userId: string;
}

async function fetchData(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
  );
  if (!response.ok) return null;
  return response.json();
}

async function ProfileSection({ userId }: ProfileSectionProps) {
  const author = await fetchData(userId);

  return <div>ProfileSection</div>;
}

export default ProfileSection;
