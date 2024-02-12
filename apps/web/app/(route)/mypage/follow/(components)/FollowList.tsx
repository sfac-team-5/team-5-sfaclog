'use client';

import { Toggle } from '@repo/ui/Toggle';
import { useEffect, useState } from 'react';
import FollowBox from './FollowBox';

async function fetchData(userId: string, toggleState: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/follow?filter=${toggleState}`,
    { cache: 'no-store' },
  );
  if (!response.ok) return null;
  return response.json();
}

function FollowList({ id }: { id: string }) {
  const [toggleState, setToggleState] = useState<'following' | 'followers'>(
    'following',
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(id, toggleState).then(setData);
  }, [id, toggleState]);

  if (!data) return null;

  const handleToggleData = () => {
    setToggleState(prevState =>
      prevState === 'following' ? 'followers' : 'following',
    );
  };

  console.log('data', data);

  return (
    <>
      <Toggle
        leftText='팔로잉'
        rightText='팔로워'
        onToggle={handleToggleData}
      />

      <div className='border-neutral-10 mt-[52px] w-full border-t'>
        <FollowBox />
      </div>
    </>
  );
}

export default FollowList;
