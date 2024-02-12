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

interface DataType {
  count: {
    followingCount: number;
    followerCount: number;
  };
  result: FollowDataType;
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

  return (
    <>
      <Toggle
        leftText={`팔로잉 ${data.count.followingCount}`}
        rightText={`팔로워 ${data.count.followerCount}`}
        onToggle={handleToggleData}
      />

      <div className='mt-[52px] w-full'>
        {toggleState === 'following' && <FollowingList data={data.result} />}
        {toggleState === 'followers' && <FollowerList data={data.result} />}
      </div>
    </>
  );
}

export default FollowContainer;
