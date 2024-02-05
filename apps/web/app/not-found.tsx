import { NotFoundImage } from '@public/svgs';
import React from 'react';
import { PrevPageButton } from './components/PrevPageButton';

function NotFound() {
  return (
    <div className='h-screen w-full bg-[#2F364D]'>
      <div className='flex h-full items-center justify-center gap-20'>
        <NotFoundImage />

        <div>
          <div className='mb-11 flex flex-col gap-3 text-white'>
            <p className='text-[100px] font-medium'>404</p>
            <p className='text-H3B18'>요청하신 페이지를 찾을 수 없습니다.</p>
            <p className='text-B2R14 text-neutral-20'>
              원하는 페이지의 결과를 찾을 수 없습니다. <br />
              입력하신 페이지의 주소가 정확한지 확인해주세요.
            </p>
          </div>

          <PrevPageButton />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
