'use client';

import { Toggle } from '@repo/ui/Toggle';
import { useEffect, useState } from 'react';
import FollowingList from './FollowingList';
import FollowerList from './FollowerList';
import { FollowDataType } from '@/types';

async function fetchData(userId: string, toggleState: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/follow?filter=${toggleState}`,
    { cache: 'no-store' },
  );
  if (!response.ok) return null;
  return response.json();
}

export interface isFollowingInfoType {
  id: string;
  isFollowing: boolean;
}

interface DataType {
  count: {
    followingCount: number;
    followerCount: number;
  };
  result: FollowDataType;
  isFollowingInfo: isFollowingInfoType[];
}

function FollowContainer({ id }: { id: string }) {
  const [toggleState, setToggleState] = useState<'following' | 'followers'>(
    'following',
  );
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetchData(id, toggleState).then(setData);
  }, [id, toggleState]);

  if (!data) return null;

  const handleToggleData = () => {
    setToggleState(prevState =>
      prevState === 'following' ? 'followers' : 'following',
    );
  };

  console.log(data);

  const updateCount = (
    type: 'follow' | 'unfollow' | 'delete',
    itemId?: string,
  ) => {
    setData(prevData => {
      if (!prevData) return null;

      let updatedFollowingCount = prevData.count.followingCount;
      let updatedFollowerCount = prevData.count.followerCount;
      let updatedIsFollowingInfo = [...prevData.isFollowingInfo];
      const updatedResult = { ...prevData.result };

      switch (type) {
        case 'follow':
          updatedFollowingCount += 1;
          break;
        case 'unfollow':
          updatedFollowingCount -= 1;
          break;
        case 'delete':
          updatedFollowerCount -= 1;
          if (updatedResult.expand && updatedResult.expand.followerId) {
            updatedResult.expand.followerId =
              updatedResult.expand.followerId.filter(
                user => user.id !== itemId,
              );
          }
          updatedIsFollowingInfo = updatedIsFollowingInfo.filter(
            info => info.id !== itemId,
          );
          break;
        default:
          break;
      }

      return {
        ...prevData,
        count: {
          followingCount: updatedFollowingCount,
          followerCount: updatedFollowerCount,
        },
        result: updatedResult,
        isFollowingInfo: updatedIsFollowingInfo,
      };
    });
  };

  return (
    <>
      <Toggle
        leftText={`팔로잉 ${data.count.followingCount}`}
        rightText={`팔로워 ${data.count.followerCount}`}
        onToggle={handleToggleData}
      />

      <div className='mt-[52px] w-full'>
        {toggleState === 'following' && (
          <FollowingList id={id} data={data.result} updateCount={updateCount} />
        )}
        {toggleState === 'followers' && (
          <FollowerList
            id={id}
            data={data.result}
            isFollowingInfo={data.isFollowingInfo}
            updateCount={updateCount}
          />
        )}
      </div>
    </>
  );
}

export default FollowContainer;
