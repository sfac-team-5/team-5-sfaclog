import React from 'react';
import NotFound from '../../../not-found';
import { SectionHeader } from '@/components/SectionHeader';
import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/community?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function PopularCommunity() {
  const popularCommunities = await fetchData();
  if (popularCommunities.length === 0) return NotFound();

  return (
    <div className='container mb-20 mt-[72px] flex flex-col gap-8'>
      <SectionHeader title='인기 커뮤니티' more='/community' />
      <div className='flex flex-col gap-6'>
        {popularCommunities.map((community: CommunityType) => {
          return (
            <CommunityCard
              variant='mainPage'
              key={community.collectionId}
              community={community}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PopularCommunity;
