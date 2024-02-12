import MyPagePagination from '@/components/Pagination/MyPagePagination';
import FollowingBox from './FollowingBox';
import { FollowDataType } from '@/types';
import { isFollowingInfoType } from './FollowContainer';

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
      <div className='text-B1B16 text-neutral-70 mt-[172px] w-full text-center'>
        아직 아무도 팔로잉하지 않았어요.
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

      {/* <MyPagePagination
        totalItems={list.length}
        page={page}
        category='following'
      /> */}
    </div>
  );
}

export default FollowingList;
