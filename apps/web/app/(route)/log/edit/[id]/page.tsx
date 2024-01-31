import NotFound from '@/not-found';
import React from 'react';
import LogEditForm from './(components)/LogEditForm';
import LogDeleteButton from './(components)/LogDeleteButton';

const fetchData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
  );
  if (!response.ok) return null;
  return response.json();
};

async function LogEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const log = await fetchData(id);
  if (!log) return NotFound();

  return (
    <main>
      <LogEditForm log={log} />
      <LogDeleteButton logId={id} />
    </main>
  );
}

export default LogEditPage;
