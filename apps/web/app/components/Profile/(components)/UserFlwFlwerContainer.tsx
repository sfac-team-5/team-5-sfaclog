'use client';

import { useState } from 'react';

import { ProfileFlwFlwer } from '.';
import UserFollowButtons from './UserFollowButtons';

interface UserFlwFlwerContainerProps {
  currentUser: string | undefined;
  logUser: string;
  initialFollowingCount: number;
  initialFollowerCount: number;
  isFollowing: boolean | undefined;
}

function UserFlwFlwerContainer({
  currentUser,
  logUser,
  initialFollowingCount,
  initialFollowerCount,
  isFollowing,
}: UserFlwFlwerContainerProps) {
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);

  const updateCount = (type: 'follow' | 'unfollow') => {
    setFollowerCount((prevCount: number) =>
      type === 'follow' ? prevCount + 1 : prevCount - 1,
    );
  };

  return (
    <>
      <div className='mt-6'>
        <ProfileFlwFlwer userId={logUser} followerCount={followerCount} />
      </div>
      {currentUser && currentUser !== logUser && (
        <UserFollowButtons
          currentUser={currentUser}
          logUser={logUser}
          isFollowing={isFollowing as boolean}
          updateCount={updateCount}
        />
      )}
    </>
  );
}

export default UserFlwFlwerContainer;
