import React from 'react';
import { DeleteAccountForm } from './(components)/DeleteAccountForm';
import { auth } from '@/auth';
export default async function page() {
  const session = await auth();
  return (
    <section className='size-full'>
      <div className='text-H1M24 text-text-primary'>회원탈퇴</div>
      <DeleteAccountForm email={session?.user.email} />
    </section>
  );
}
