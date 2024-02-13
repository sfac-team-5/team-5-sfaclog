import { useEffect, useState } from 'react';

import { Avatar } from '@/components/Avatar';
import CapsuleButton from '@repo/ui/CapsuleButton';
import { IconCancelBlack, IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';
import { FollowBoxProps } from './FollowingBox';
import { useRouter } from 'next/navigation';
import { useModalDataActions } from '@/hooks/stores/useModalDataStore';

function FollowerBox({ id, data, updateCount, isFollowing }: FollowBoxProps) {
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

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
  };

  const onDelete = () => {
    router.push(`/modal?type=follower-delete`);
    changeModalData({ type: 'follower-delete', action: handleDeleteClick });
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
    <div className='flex items-center justify-between border-b border-neutral-10 py-5'>
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
                className='w-[82px] px-0 text-B3R12 hover:bg-white'
                onClick={handleUnfollowClick}
              />
            ) : (
              <CapsuleButton
                icon={<IconCheckWhite />}
                size='m'
                label='팔로잉'
                color='blue'
                className='w-[82px] !px-0 text-B3R12 hover:bg-brand-70'
              />
            )}
          </div>
          <button
            className='flex size-9 items-center justify-center rounded-full border border-neutral-10'
            onClick={onDelete}
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
            className='w-[82px] !px-0 text-B3R12'
            onClick={handleFollowClick}
          />
          <button
            className='flex size-9 items-center justify-center rounded-full border border-neutral-10'
            onClick={onDelete}
          >
            <IconCancelBlack width={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default FollowerBox;
