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

interface CommunityListProps {
  communityList: any[];
}

async function CommunityList({ communityList }: CommunityListProps) {
  const popularCommunities = await fetchData();

  return (
    <div className='container mb-20 mt-[72px] flex flex-col gap-8'>
      <div className='grid grid-cols-3 gap-5'>
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
    </div>
  );
}

export default CommunityList;
