import { FollowDataType } from '@/types';

interface FollowingListProps {
  data: FollowDataType;
}

function FollowingList({ data }: FollowingListProps) {
  console.log(data);

  if (data.followingId?.length === 0) {
    return (
      <div className='text-B1B16 text-neutral-70 mt-[172px] w-full text-center'>
        아직 아무도 팔로잉하지 않았어요.
      </div>
    );
  }

  return <div>FollowingList</div>;
}

export default FollowingList;
