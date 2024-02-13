import PocketBase from 'pocketbase';

import NotFound from '../../../not-found';
import CommentSection from './(components)/CommentSection/CommentSection';
import ContentSection from './(components)/ContentSection/ContentSection';
import { UserProfileCard } from '@/components/Profile/UserProfileCard';
import ViewObserver from './(components)/ViewObserver';
import LogSection from './(components)/LogSection';
import Footer from '@/components/Footer/Footer';
import { auth } from '@/auth';

export const revalidate = 1;

const fetchData = async (currentUser: any, logId: string) => {
  const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

  const log = await pb.collection('logs').getOne(logId, { expand: 'user' });
  const logUser = log.expand?.user.id;

  if (currentUser) {
    // 현재 사용자의 팔로잉 목록 조회
    const followingList = await pb
      .collection('following')
      .getFirstListItem(`userId="${currentUser}"`, {
        expand: 'followingId',
      });

    // logUser가 currentUser에 의해 팔로우되고 있는지 확인
    const isFollowing = followingList.followingId.includes(logUser);
    return { log, isFollowing };
  } else {
    return { log };
  }
};

async function LogDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const { id } = params;
  const result = await fetchData(session?.user.id, id);
  if (!result.log || result.log.isDelete) return NotFound();

  return (
    <>
      <main className='container mb-[120px] mt-20 flex gap-16'>
        <div className='flex flex-col gap-5'>
          <UserProfileCard
            user={result.log.expand?.user}
            isFollowing={result.isFollowing}
          />
          <LogSection />
        </div>
        <div className='w-full'>
          <ContentSection log={result.log} />
          <CommentSection
            logId={result.log.id}
            authorId={result.log.expand?.user.id}
          />
        </div>
        <ViewObserver logId={id} />
      </main>

      <Footer />
    </>
  );
}

export default LogDetailPage;
