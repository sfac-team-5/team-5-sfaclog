import React from 'react';
import PocketBase from 'pocketbase';
import NotFound from '@/not-found';
import LogEditForm from './(components)/LogEditForm';
import LogDeleteButton from './(components)/LogDeleteButton';

const fetchData = async (logId: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const log = await pb.collection('logs').getOne(logId, { expand: 'user' });

    return log;
  } catch (error) {
    return null;
  }
};

async function LogEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const log = await fetchData(id);
  if (!log) return NotFound();

  return (
    <main>
      <h1 className='text-H0M32 my-[46px] text-center'>로그 수정</h1>
      <LogEditForm log={log} />
      {/* <LogDeleteButton logId={id} /> */}
    </main>
  );
}

export default LogEditPage;
