import { useEffect, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import CapsuleButton from '@repo/ui/CapsuleButton';
import { IconCancelBlack, IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';

function FollowerBox() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const handleUnfollowClick = () => {
    setIsFollowing(false);
  };

  const handleFollowClick = () => {
    setIsFollowing(true);
  };

  return (
    <>
      {isFollowing ? (
        <div className='border-neutral-10 flex items-center justify-between border-b py-5'>
          <div className='flex gap-3'>
            <Avatar size={60} />
            <div className='flex flex-col justify-center gap-1.5'>
              <p className='text-B1M16 text-neutral-90'>oceanwave72</p>
              <span className='text-B2R14 text-neutral-70'>
                소개글입니다소개글입니다소개글입니다소개글입니다소개글입니다소...
              </span>
            </div>
          </div>

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
                  className='text-B3R12 hover:bg-brand-70 w-[82px] px-0'
                />
              )}
            </div>
            <button className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'>
              <IconCancelBlack width={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className='border-neutral-10 flex items-center justify-between border-b py-5'>
          <div className='flex gap-3'>
            <Avatar size={60} />
            <div className='flex flex-col justify-center gap-1.5'>
              <p className='text-B1M16 text-neutral-90'>oceanwave72</p>
              <span className='text-B2R14 text-neutral-70'>
                소개글입니다소개글입니다소개글입니다소개글입니다소개글입니다소...
              </span>
            </div>
          </div>

          <div className='flex gap-3'>
            <CapsuleButton
              icon={<IconPlusBlue />}
              size='m'
              label='팔로우'
              color='white'
              className='text-B3R12 w-[82px] px-0'
              onClick={handleFollowClick}
            />
            <button className='border-neutral-10 flex size-9 items-center justify-center rounded-full border'>
              <IconCancelBlack width={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FollowerBox;
