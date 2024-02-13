import { useEffect, useState } from 'react';

import { Avatar } from '@/components/Avatar';
import CapsuleButton from '@repo/ui/CapsuleButton';
import { IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';
import { UserType } from '@/types';

export interface FollowBoxProps {
  id: string;
  data: UserType;
  updateCount: (
    type: 'follow' | 'unfollow' | 'delete',
    itemId?: string,
  ) => void;
  isFollowing?: boolean;
}

function FollowingBox({ id, data, updateCount }: FollowBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const intro =
    data.intro.length > 34 ? data.intro.substr(0, 34) + '...' : data.intro;

  const handleUnfollowClick = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.id}/follow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'unfollow',
            userId: id,
            targetId: data.id,
          }),
        },
      );
      setIsFollowing(false);
      updateCount('unfollow');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowClick = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.id}/follow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'follow',
            userId: id,
            targetId: data.id,
          }),
        },
      );
      setIsFollowing(true);
      updateCount('follow');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.avatar) {
      const fetchAvatarUrl = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.id}/avatar`,
          );
          const avatarData = await response.json();
          setAvatarUrl(avatarData.avatarUrl);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAvatarUrl();
    } else {
      setAvatarUrl(undefined);
    }
  }, [data.avatar]);

  return (
    <div className='border-neutral-10 flex items-center justify-between border-b py-5'>
      <div className='flex gap-3'>
        <Avatar size={60} url={avatarUrl} />
        <div className='flex flex-col justify-center gap-1.5'>
          <p className='text-B1M16 text-neutral-90'>{data.nickname}</p>
          <span className='text-B2R14 text-neutral-70'>{intro}</span>
        </div>
      </div>

      {isFollowing ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleUnfollowClick}
        >
          {isHovered ? (
            <CapsuleButton
              size='m'
              label='언팔로우'
              color='white'
              className='text-B3R12 w-[82px] px-0 hover:bg-white'
            />
          ) : (
            <CapsuleButton
              icon={<IconCheckWhite />}
              size='m'
              label='팔로잉'
              color='blue'
              className='text-B3R12 hover:bg-brand-70 w-[82px] !px-0'
            />
          )}
        </div>
      ) : (
        <div>
          <CapsuleButton
            icon={<IconPlusBlue />}
            size='m'
            label='팔로우'
            color='white'
            className='text-B3R12 w-[82px] !px-0'
            onClick={handleFollowClick}
          />
        </div>
      )}
    </div>
  );
}

export default FollowingBox;
