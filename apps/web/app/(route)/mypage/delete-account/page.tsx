import React from 'react';
import { DeleteAccountForm } from './(components)/DeleteAccountForm';
export default function page() {
  return (
    <section className='size-full'>
      <div className='text-H1M24 text-text-primary'>회원탈퇴</div>
      <DeleteAccountForm />
    </section>
  );
}
