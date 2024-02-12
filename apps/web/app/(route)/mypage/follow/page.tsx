import { auth } from '@/auth';
import NotFound from '@/not-found';
import FollowList from './(components)/FollowContainer';

async function page() {
  const session = await auth();
  if (!session) return NotFound();

  return (
    <div className='flex w-[632px] flex-col items-center'>
      <FollowList id={session.user.id} />
    </div>
  );
}

export default page;
