import TextButton from '@/components/TextButton';
import Button from '@repo/ui/Button';
import ButtonWithIcon from '@repo/ui/ButtonWithIcon';
import SNSButton from '@repo/ui/SNSButton';

import React from 'react';

function page() {
  return (
    <div>
      <Button type='button' size='s' label='스몰버튼' />
      <Button type='button' size='m' label='중간버튼' />
      <Button type='button' size='l' label='라지버튼' />
      <Button type='button' size='l' label='라지버튼' disabled={true} />
      <ButtonWithIcon type='button' size='s' label='스몰버튼' />
      <ButtonWithIcon type='button' size='m' label='중간버튼' />
      <ButtonWithIcon type='button' size='l' label='라지버튼' />
      <ButtonWithIcon type='button' size='l' label='라지버튼' disabled={true} />
      <SNSButton
        type='button'
        size='l'
        label='Kakao 계정 로그인'
        labelColor='text-neutral-90'
        bgColor='bg-[#FFDE02]'
      />
      <SNSButton
        type='button'
        size='l'
        label='Naver 계정 로그인'
        labelColor='text-white'
        bgColor='bg-[#03C75A]'
      />
      <SNSButton
        type='button'
        size='l'
        label='Google 계정 로그인'
        labelColor='text-neutral-90'
        bgColor='bg-white'
        borderColor='border-neutral-30'
      />
      <TextButton link='/login' />
    </div>
  );
}

export default page;
