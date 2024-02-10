import React from 'react';
import {
  ProfileContainer,
  ProfileIntro,
  Hr,
  ProfileFlwFlwer,
  MyProfileHeader,
  ProfileCareer,
  ProfileLink,
} from './components';
import { UserType } from '@/types';

export async function MyProfileCard({ user }: { user: UserType }) {
  return (
    <ProfileContainer>
      <MyProfileHeader updateMyPofileLink='#' />
      <ProfileIntro
        username={user.nickname}
        userintro={user.intro}
        imageUrl={`${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185`}
      />
      <div className='mt-6'>
        <ProfileFlwFlwer follow={24} follower={999} />
      </div>
      <Hr />
      <ProfileCareer career={user.career} />
      <Hr />
      <div className='flex flex-col gap-3'>
        <div className='text-B1B16'>나의 활동</div>
        <ProfileLink href='#' title='나의 로그' />
        <ProfileLink href='#' title='나의 커뮤니티' />
        <ProfileLink href='#' title='내가 쓴 댓글' />
        <ProfileLink href='#' title='관심 로그' />
        <ProfileLink href='#' title='최근 본 로그' />
        <ProfileLink href='#' title='최근 본 커뮤니티' />
      </div>
      <Hr />
      <div className='flex flex-col gap-3'>
        <ProfileLink href='#' title='이용약관&개인정보 처리 방침' />
        <ProfileLink href='#' title='로그아웃' />
        <ProfileLink href='#' title='회원탈퇴' />
      </div>
    </ProfileContainer>
  );
}
