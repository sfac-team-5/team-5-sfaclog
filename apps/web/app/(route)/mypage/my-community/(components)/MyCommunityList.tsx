import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';
import React from 'react';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/community?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function MyCommunityList() {
  const popularCommunities = await fetchData();

  return (
    <div className='grid grid-cols-2 gap-6'>
      {popularCommunities.map((community: CommunityType) => {
        return (
          <CommunityCard
            variant='communityPage'
            key={community.collectionId}
            community={community}
          />
        );
      })}
    </div>
  );
}

export default MyCommunityList;
