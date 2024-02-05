import React from 'react';
import { notFound } from 'next/navigation';
import { auth, signIn, signOut } from '../../auth';
import { Client } from './Client';
import { ClientSessionProvider } from '../../components/Providers/ClientSessionProvider';
import { Avatar } from '@/components/Avatar';

async function Page({ params }: { params: { id: string } }) {
  // const response = await fetch(
  //   `http://localhost:3000/api/pocket/${params.id}`,
  //   { cache: 'no-cache' },
  // );
  // if (!response.ok) {
  //   notFound();
  // }
  // const data = await response.json();
  const session = await auth();
  return (
    <div>
      <Avatar size={'large'} />
      <Avatar size={'medium'} />
      <Avatar size={'small'} />
      <Avatar size={'xs'} />
      <Avatar size={10} />
      <form
        action={async formData => {
          'use server';
          const id = formData.get('id');
          const pw = formData.get('pw');
          await signIn('credentials', { id, password: pw });
        }}
      >
        <input type='text' name='id' />
        <input type='password' name='pw' />
        <button type='submit'>제출</button>
      </form>
      <div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type='submit'>로그아웃</button>
        </form>
      </div>
      <div>server component = {session && JSON.stringify(session)}</div>
      <ClientSessionProvider>
        <Client />
      </ClientSessionProvider>
    </div>
  );
}

export default Page;
