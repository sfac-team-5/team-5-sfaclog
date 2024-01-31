import React from 'react';
import FindPasswordFormHeader from './(components)/FindPasswordFormHeader';
import FindPasswordForm from './(components)/FindPasswordForm';

export default function page() {
  return (
    <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
      <FindPasswordFormHeader />
      <FindPasswordForm />
    </main>
  );
}
