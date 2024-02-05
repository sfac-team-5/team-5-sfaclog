import TextButton from '@/components/TextButton';
import Button from '@repo/ui/Button';
import SNSButton from '@repo/ui/SNSButton';
import CapsuleButton from '@repo/ui/CapsuleButton';

import React from 'react';
import HeartCapsuleButton from '@repo/ui/HeartCapsuleButton';

function page() {
  return (
    <div>
      <Button type='button' size='s' label='스몰버튼' />
      <Button type='button' size='m' label='중간버튼' />
      <Button type='button' size='l' label='라지버튼' />
      <Button type='button' size='l' label='라지버튼' disabled={true} />

      <br />

      <Button type='button' size='s' label='스몰버튼' icon='example' />
      <Button type='button' size='m' label='중간버튼' icon='example' />
      <Button type='button' size='l' label='라지버튼' icon='example' />
      <Button
        type='button'
        size='l'
        label='라지버튼'
        icon='example'
        disabled={true}
      />

      <br />

      <SNSButton
        type='button'
        size='l'
        label='Kakao 계정 로그인'
        labelColor='text-neutral-90'
        bgColor='bg-[#FFDE02]'
        icon=''
      />
      <SNSButton
        type='button'
        size='l'
        label='Naver 계정 로그인'
        labelColor='text-white'
        bgColor='bg-[#03C75A]'
        icon=''
      />
      <SNSButton
        type='button'
        size='l'
        label='Google 계정 로그인'
        labelColor='text-neutral-90'
        bgColor='bg-white'
        borderColor='border-neutral-30'
        icon=''
      />

      <br />

      <TextButton link='/login' />

      <br />

      <CapsuleButton label='회원가입' />
      <CapsuleButton label='전체' size='l' />

      <br />

      <HeartCapsuleButton label='999+' />
    </div>
  );
}

export default page;
