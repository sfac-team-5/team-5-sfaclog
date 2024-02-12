import { FollowDataType } from '@/types';

interface FollowerListProps {
  data: FollowDataType;
}

function FollowerList({ data }: FollowerListProps) {
  if (data.followerId?.length === 0) {
    return (
      <div className='text-B1B16 text-neutral-70 mt-[172px] w-full text-center'>
        아직 아무도 회원님을 팔로우하지 않았어요.
      </div>
    );
  }

  return <div>FollowerList</div>;
}

export default FollowerList;
