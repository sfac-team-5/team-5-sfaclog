import FollowerBox from './FollowerBox';
import { FollowListProps } from './FollowingList';

function FollowerList({
  id,
  data,
  updateCount,
  isFollowingInfo,
}: FollowListProps) {
  const list = data.expand?.followerId;

  if (data.followerId?.length === 0) {
    return (
      <div className='text-B1B16 text-neutral-70 mt-[172px] w-full text-center'>
        아직 아무도 회원님을 팔로우하지 않았어요.
      </div>
    );
  }

  return (
    <div className='border-neutral-10 border-t'>
      {list?.map((item, idx) => {
        const isFollowing =
          isFollowingInfo?.find(info => info.id === item.id)?.isFollowing ??
          false;
        return (
          <FollowerBox
            key={idx}
            id={id}
            data={item}
            isFollowing={isFollowing}
            updateCount={updateCount}
          />
        );
      })}
    </div>
  );
}

export default FollowerList;
