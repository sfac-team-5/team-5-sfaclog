import { useEffect, useState } from 'react';

import { Avatar } from '@/components/Avatar';
import CapsuleButton from '@repo/ui/CapsuleButton';
import { IconCancelBlack, IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';
import { FollowBoxProps } from './FollowingBox';

function FollowerBox({ id, data, updateCount, isFollowing }: FollowBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowingButton, setIsFollowingButton] = useState(isFollowing);
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
      setIsFollowingButton(false);
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
      setIsFollowingButton(true);
      updateCount('follow');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = confirm('팔로워를 삭제하시겠습니까?');

    if (isConfirmed) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.id}/follow`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'delete',
              userId: id,
              targetId: data.id,
            }),
          },
        );
        updateCount('delete', data.id);
      } catch (error) {
        console.log(error);
      }
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

      {isFollowingButton ? (
        <div className='flex gap-3'>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <CapsuleButton
                size='m'
                label='언팔로우'
                color='white'
                className='text-B3R12 w-[82px] px-0 hover:bg-white'
                onClick={handleUnfollowClick}
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
          <button
            className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'
            onClick={handleDeleteClick}
          >
            <IconCancelBlack width={16} />
          </button>
        </div>
      ) : (
        <div className='flex gap-3'>
          <CapsuleButton
            icon={<IconPlusBlue />}
            size='m'
            label='팔로우'
            color='white'
            className='text-B3R12 w-[82px] !px-0'
            onClick={handleFollowClick}
          />
          <button
            className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'
            onClick={handleDeleteClick}
          >
            <IconCancelBlack width={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default FollowerBox;
