import FollowingBox from './FollowingBox';
import { FollowDataType } from '@/types';
import { isFollowingInfoType } from './FollowContainer';
import { MypageNotFound } from '../../(components)/MypageNotFound';

export interface FollowListProps {
  id: string;
  data: FollowDataType;
  updateCount: (
    type: 'follow' | 'unfollow' | 'delete',
    itemId?: string,
  ) => void;
  isFollowingInfo?: isFollowingInfoType[];
}

function FollowingList({ id, data, updateCount }: FollowListProps) {
  const list = data.expand?.followingId;

  if (data.followingId?.length === 0) {
    return (
      <div className='text-B1B16 text-neutral-70 mt-[172px] flex w-full justify-center'>
        <MypageNotFound title='아직 아무도 팔로잉하지 않았어요.' />
      </div>
    );
  }

  return (
    <div className='border-neutral-10 border-t'>
      {list?.map((item, idx) => {
        return (
          <FollowingBox
            key={idx}
            id={id}
            data={item}
            updateCount={updateCount}
          />
        );
      })}
    </div>
  );
}

export default FollowingList;
