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
      <Avatar size='l' type='all' />
      <Avatar size='m' />
      <Avatar size='s' />
      <Avatar
        size={'xs'}
        url='https://s3-alpha-sig.figma.com/img/845c/814c/d0b5fe4d7a78c993c87bd9d32c315f32?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HDc7KF3jXKlpaeKKWSkyCLBZB~otfUQncX515H0Qd-45m0L0ruVfTwvjlIBPHPlBe9nMTJTD-QfXQhsf7FLyFBulNS54CXUSbMjKgo6b9yi1zn048KTi~G0shfNnOkx~o~TfDu7Lf21CyPV164H6Ct6uQhHY44-MjfTSPauVykif2WS3wzMTn0LD23IRI9ObRRVxKRwVOroPpXr3eCWBS4WTMWilOkfqBQmZDueboYanFyty4VjkIhfi1bYtNV3D1pQ37stPOgCjDq27baDlUdMqBXbe1uPi5Bi8W6WsODjnQNfzaMd4lHbZvZWx~EcedWAMv~kl2JsKHRh-4iGvBg__'
      />
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
