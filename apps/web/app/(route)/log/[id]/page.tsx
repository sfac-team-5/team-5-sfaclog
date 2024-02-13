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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${logId}?currentUser=${currentUser}`,
  );
  if (!response.ok) return null;
  return response.json();
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
            user={result.log.expand.user}
            isFollowing={result.isFollowing}
          />
          <LogSection />
        </div>
        <div className='w-full'>
          <ContentSection log={result.log} />
          <CommentSection logId={result.log.id} />
        </div>
        <ViewObserver logId={id} />
      </main>

      <Footer />
    </>
  );
}

export default LogDetailPage;
