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
  community: CommunityType;
}

export function CommunityCard({ community }: CommunityCardProps) {
  const nickname = community.expand?.author?.nickname
    ? community.expand.author.nickname
    : '사용자명';
  const content =
    community.content.length > 100
      ? community.content.substr(0, 100) + '...'
      : community.content;

  return (
    <CardBox type='community'>
      <div className='flex size-[150px] flex-col items-center justify-center gap-3 overflow-hidden'>
        <Avatar size={80} />
        <span className='text-B2B14'>{nickname}</span>
      </div>

      <div className='bg-brand-30 mx-6 h-[150px] w-[1px]'></div>

      <div className='flex h-[150px] w-[calc(100%-150px-50px)] flex-col justify-between'>
        <div className='mb-[18px] flex items-center justify-between'>
          <CardCategory category={community.category} />
          <CardDate date={community.created} />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <CardTitle title={community.title} />
          <p className='text-neutral-70 text-B2R14'>{content}</p>
        </div>
        <div className='mt-5 flex w-full justify-between'>
          <div className='flex items-center gap-[6px]'>
            <CardTag tag='tag' />
            <CardTag tag='tag' />
            <CardTag tag='tag' />
            {/* {community.tags.map((tag, idx) => {
              return <CardTag key={idx} tag={tag} />;
            })} */}
          </div>
          <div className='flex gap-3'>
            <CardComments count={community.comments} />
            <CardLikes count={community.likes} />
          </div>
        </div>
      </div>
    </CardBox>
  );
}
