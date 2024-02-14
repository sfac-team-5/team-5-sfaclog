import React from 'react';
import PocketBase from 'pocketbase';

import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';
import { MypageNotFound } from '../../(components)/MypageNotFound';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const records = await pb.collection('communities').getList(1, 5, {
      sort: '-likes',
      expand: 'author',
    });

    return records.items as CommunityType[];
  } catch (error) {
    return [];
  }
};

async function RecentlyCommunityList() {
  const popularCommunities = await fetchData();

  if (popularCommunities.length === 0)
    return (
      <div className='mt-[170px] flex w-full justify-center'>
        <MypageNotFound
          title='최근 본 커뮤니티 글이 없어요.'
          description='커뮤니티에서 다양한 소식들을 살펴보세요.'
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

export default RecentlyCommunityList;
