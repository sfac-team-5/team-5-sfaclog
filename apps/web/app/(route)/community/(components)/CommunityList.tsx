import { CommunityCard } from '@/components/Card/CommunityCard';
import { CommunityType } from '@/types';

interface CommunityListProps {
  communityList: any[];
}

async function CommunityList({ communityList }: CommunityListProps) {
  return (
    <div className='mb-20 mt-[72px] flex flex-col gap-8'>
      <div className='grid grid-cols-3 gap-5'>
        {communityList.map((community: CommunityType) => {
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
