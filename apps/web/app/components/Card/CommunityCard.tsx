import { CardBox } from './(components)/CardBox';
import { CardCategory } from './(components)/CardCategory';
import { CardTitle } from './(components)/CardTitle';
import { CardLikes } from './(components)/CardLikes';
import { CardDate } from './(components)/CardDate';
import { CardComments } from './(components)/CardComments';
import { CardTag } from './(components)/CardTag';
import { Avatar } from '../Avatar';

const dummyData = {
  content:
    '더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미텍스트 더미더미텍스트 더미텍스트 더미텍스트 더미텍스트',
  created: '2024-01-26 08:01:17 UTC',
  likes: 680,
  comments: 20,
  category: '자유주제',
  tags: ['tag', 'tag', 'tag'],
  title: '효과적인 의사소통을 위한 비언어적 신호',
  user: '화끈한 군고구마',
};

interface CommunityCardProps {
  community?: {
    content: string;
    created: string;
    likes: number;
    comments: number;
    category: string;
    tags: string[];
    title: string;
    user: string;
  };
}

export function CommunityCard({ community = dummyData }: CommunityCardProps) {
  const content = dummyData.content.substr(0, 100) + '...';

  return (
    <CardBox type='community'>
      <div className='flex size-[150px] flex-col items-center justify-center gap-3 overflow-hidden'>
        <Avatar size={80} />
        <span className='text-B2B14'>{community.user}</span>
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
            {community.tags.map((tag, idx) => {
              return <CardTag key={idx} tag={tag} />;
            })}
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
