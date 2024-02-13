import React from 'react';
import NotFound from '../../../not-found';
import CommentSection from './(components)/CommentSection/CommentSection';
import ContentSection from './(components)/ContentSection/ContentSection';
import { UserProfileCard } from '@/components/Profile/UserProfileCard';
import ViewObserver from './(components)/ViewObserver';
import LogSection from './(components)/LogSection';
import Footer from '@/components/Footer/Footer';

export const revalidate = 1;

const fetchData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
  );
  if (!response.ok) return null;
  return response.json();
};

async function LogDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const log = await fetchData(id);
  if (!log || log.isDelete) return NotFound();

  return (
    <main className='container mb-[120px] mt-20 flex gap-16'>
      <div className='flex flex-col gap-5'>
        <UserProfileCard user={log.expand.user} />
        <LogSection />
      </div>
      <div className='w-full'>
        <ContentSection log={log} />
        <CommentSection logId={log.id} />
      </div>
      <ViewObserver logId={id} />
    </main>
  );
}

export default LogDetailPage;
