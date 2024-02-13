import { useEffect, useState } from 'react';

import { Avatar } from '@/components/Avatar';
import CapsuleButton from '@repo/ui/CapsuleButton';
import { IconCancelBlack, IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';
import { FollowBoxProps } from './FollowingBox';
import { useRouter } from 'next/navigation';
import { useModalDataActions } from '@/hooks/stores/useModalStore';

function FollowerBox({ id, data, updateCount, isFollowing }: FollowBoxProps) {
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [followStatus, setFollowStatus] = useState(isFollowing);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const intro =
    data.intro.length > 34 ? data.intro.substr(0, 34) + '...' : data.intro;

  const handleUnfollowClick = async () => {
    try {
      setIsProcessing(true);
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
      setFollowStatus(true);
      updateCount('follow');
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
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
    changeModalData({
      title: '이 사용자를 삭제하시겠습니까?',
      description:
        '해당 사용자는 회원님의 팔로워 리스트에서 삭제된 사실을 알 수 없습니다.',
      action: () => handleDeleteClick(),
    });
    router.push(`/modal`);
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

      {followStatus ? (
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
                className='text-B3R12 w-[82px] !px-0 hover:bg-white'
                onClick={handleUnfollowClick}
                disabled={isProcessing}
              />
            ) : (
              <CapsuleButton
                icon={<IconCheckWhite />}
                size='m'
                label='팔로잉'
                color='blue'
                className='text-B3R12 hover:bg-brand-70 w-[82px] !px-0'
                disabled={isProcessing}
              />
            )}
          </div>
          <button
            className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'
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
            className='text-B3R12 w-[82px] !px-0'
            onClick={handleFollowClick}
            disabled={isProcessing}
          />
          <button
            className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'
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
