'use client';
import { useState } from 'react';

import { ButtonRound } from '@repo/ui/ButtonRound';
import { IconCheckWhite, IconPlusWhite } from '@repo/ui/Icon';

interface UserFollowButtonsProps {
  currentUser: string;
  logUser: string;
  isFollowing: boolean;
  updateCount: (type: 'follow' | 'unfollow') => void;
}

function UserFollowButtons({
  currentUser,
  logUser,
  isFollowing,
  updateCount,
}: UserFollowButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [followStatus, setFollowStatus] = useState(isFollowing);

  const handleUnfollowClick = async () => {
    try {
      setIsProcessing(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${logUser}/follow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'unfollow',
            userId: currentUser,
            targetId: logUser,
          }),
        },
      );
      setFollowStatus(false);
      updateCount('unfollow');
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFollowClick = async () => {
    try {
      setIsProcessing(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${logUser}/follow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'follow',
            userId: currentUser,
            targetId: logUser,
          }),
        },
      );
      setFollowStatus(true);
      updateCount('follow');
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-6 grid grid-cols-2 gap-2'>
      {followStatus ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleUnfollowClick}
        >
          {isHovered ? (
            <ButtonRound type='filled' disabled={isProcessing}>
              언팔로우
            </ButtonRound>
          ) : (
            <ButtonRound type='filled' disabled={isProcessing}>
              <div className='flex items-center justify-center gap-1'>
                <IconCheckWhite />
                팔로잉
              </div>
            </ButtonRound>
          )}
        </div>
      ) : (
        <div onClick={handleFollowClick}>
          <ButtonRound type='filled' disabled={isProcessing}>
            <div className='flex items-center justify-center gap-1'>
              <IconPlusWhite width={16} />
              팔로우
            </div>
          </ButtonRound>
        </div>
      )}

      <ButtonRound type='outline'>제안하기</ButtonRound>
    </div>
  );
}

export default UserFollowButtons;
