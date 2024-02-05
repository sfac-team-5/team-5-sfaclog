import { CardBox } from './(components)/CardBox';
import { CardCategory } from './(components)/CardCategory';
import { CardTitle } from './(components)/CardTitle';
import { CardLikes } from './(components)/CardLikes';
import { CardDate } from './(components)/CardDate';
import { CardComments } from './(components)/CardComments';
import { CardTag } from './(components)/CardTag';
import { Avatar } from '../Avatar';
import { CommunityType } from '@/types';

interface CommunityCardProps {
  variant: 'mainPage' | 'communityPage';
  community: CommunityType;
}

export function CommunityCard({ variant, community }: CommunityCardProps) {
  const nickname = community.expand?.author?.nickname
    ? community.expand.author.nickname
    : '사용자명';

  const charLimit = variant === 'mainPage' ? 100 : 40;
  const content =
    community.content.length > charLimit
      ? community.content.substr(0, charLimit) + '...'
      : community.content;

  return (
    <CardBox type={variant === 'mainPage' ? 'communityMain' : 'communityPage'}>
      {variant === 'mainPage' && (
        <>
          <div className='flex size-[150px] flex-col items-center justify-center gap-3 overflow-hidden'>
            <Avatar size={80} />
            <span className='text-B2B14'>{nickname}</span>
          </div>

          <div className='bg-brand-30 mx-6 h-[150px] w-[1px]'></div>
        </>
      )}

      <div
        className={`flex flex-col justify-between ${variant === 'mainPage' ? 'h-[150px] w-[calc(100%-150px-50px)]' : 'w-full'}`}
      >
        <div
          className={`flex items-center justify-between ${variant === 'mainPage' ? 'mb-[18px]' : 'mb-[17px]'}`}
        >
          <CardCategory category={community.category} />
          <CardDate date={community.created} />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <CardTitle title={community.title} />
          <p
            className={`text-neutral-70 text-B2R14 ${variant === 'communityPage' && 'h-[34px]'}`}
          >
            {content}
          </p>
        </div>
        <div
          className={`flex w-full justify-between  ${variant === 'mainPage' ? 'mt-5' : 'mt-[17px]'}`}
        >
          <div className='flex items-center gap-[6px]'>
            <CardTag tag='tag' />
            <CardTag tag='tag' />
            <CardTag tag='tag' />
            {/* {community.tags.map((tag, idx) => {
              return <CardTag key={idx} tag={tag} />;
            })} */}
          </div>

          {variant === 'mainPage' && (
            <div className='flex gap-3'>
              <CardComments count={community.comments} />
              <CardLikes count={community.likes} />
            </div>
          )}
        </div>
      </div>

      {variant === 'communityPage' && (
        <div className='mt-[22px] w-full'>
          <div className='mb-[13px] flex gap-[10px]'>
            <Avatar size={55} />
            <div className='flex flex-col justify-center'>
              <span className='text-B2B14'>{nickname}</span>
              <span className='text-neutral-40 text-B5R10 mt-1'>
                {community.expand?.author?.intro}
              </span>
            </div>
          </div>
          <div className='flex w-full justify-end gap-3'>
            <CardComments count={community.comments} />
            <CardLikes count={community.likes} />
          </div>
        </div>
      )}
    </CardBox>
  );
}
