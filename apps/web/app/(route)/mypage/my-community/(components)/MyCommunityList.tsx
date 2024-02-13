import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';
import React from 'react';
import { MypageNotFound } from '../../(components)/MypageNotFound';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/community?sorted=popular`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function MyCommunityList() {
  const popularCommunities = await fetchData();
  if (popularCommunities.length === 0)
    return (
      <div className='mt-[170px] flex w-full justify-center'>
        <MypageNotFound
          title='아직 작성한 커뮤니티 글이 없어요.'
          description='커뮤니티에 글을 남겨 보세요.'
          buttonLabel='커뮤니티 바로가기'
          href='/community'
        />
      </div>
    );

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
