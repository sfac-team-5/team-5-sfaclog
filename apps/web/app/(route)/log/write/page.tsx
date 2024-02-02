import React from 'react';
import LogWriteForm from './(components)/LogWriteForm/LogWriteForm';
import Link from 'next/link';

function LogWritePage() {
  return (
    <main>
      <h1 className='text-H0M32 my-[46px] text-center'>로그 작성</h1>
      <LogWriteForm />
      <Link href={'/modal?type=log-delete&id=swr3sv81315pha6'} scroll={false}>
        삭제하기
      </Link>
      <Link
        href={'/modal?type=user-block&id=123&username=뜨거운감자'}
        scroll={false}
      >
        차단하기
      </Link>
      <Link href={'/modal?type=log-cancel'} scroll={false}>
        취소하기
      </Link>
    </main>
  );
}

export default LogWritePage;
