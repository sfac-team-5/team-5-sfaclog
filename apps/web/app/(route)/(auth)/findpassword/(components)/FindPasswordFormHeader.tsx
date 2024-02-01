import React from 'react';

function FindPasswordFormHeader() {
  return (
    <div className='mb-[28px] flex flex-col items-center gap-[20px]'>
      <span className='text-H0M32 text-text-secondary'>비밀번호 찾기</span>
      <span className='text-B1R16 text-text-primary'>
        가입시 사용한 이름과 이메일을 입력해주세요.
      </span>
    </div>
  );
}

export default FindPasswordFormHeader;
