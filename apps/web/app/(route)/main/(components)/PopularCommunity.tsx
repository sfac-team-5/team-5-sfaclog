import PocketBase from 'pocketbase';

import { SectionHeader } from '@/components/SectionHeader';
import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';
import { NoData } from '@/components/NoData';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const records = await pb
      .collection('communities')
      .getList<CommunityType>(1, 5, {
        sort: '-likes',
        expand: 'author',
      });
    return records.items;
  } catch (error) {
    return [];
  }
};

async function PopularCommunity() {
  const popularCommunities = await fetchData();
  if (popularCommunities.length === 0) return NoData();

  return (
    <div className='container mb-20 mt-[72px] flex flex-col gap-8'>
      <SectionHeader title='인기 커뮤니티' more='/community' />
      <div className='flex flex-col gap-6'>
        {popularCommunities.map(community => {
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
