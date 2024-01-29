import React from 'react';
import NotFound from '../../../not-found';
import ProfileSection from './(components)/ProfileSection';
import ContentSection from './(components)/ContentSection';
import CommentSection from './(components)/CommentSection';

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
  if (!log) return NotFound();

  return (
    <main>
      <ProfileSection userId={log.user} />
      <ContentSection log={log} />
      <CommentSection logId={log.id} />
    </main>
  );
}

export default LogDetailPage;
