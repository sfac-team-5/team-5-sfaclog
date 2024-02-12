import React from 'react';
import {
  ProfileContainer,
  ProfileIntro,
  Hr,
  ProfileFlwFlwer,
  MyProfileHeader,
  ProfileCareer,
  MyProfileLink,
} from './(components)';
import { UserType } from '@/types';
import { MyProfileLogout } from './(components)/MyProfileLogout';
export async function MyProfileCard({ user }: { user: UserType }) {
  return (
    <ProfileContainer>
      <MyProfileHeader updateMyPofileLink='#' />
      <ProfileIntro
        username={user.nickname || 'error'}
        userintro={user.intro || 'error'}
        imageUrl={
          `${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185` ||
          'error'
        }
      />
      <div className='mt-6'>
        <ProfileFlwFlwer follow={24} follower={999} />
      </div>
      {Object.entries(user.career).length !== 0 && (
        <>
          <Hr />
          <ProfileCareer career={user.career} />
        </>
      )}
      <Hr />
      <div className='flex flex-col gap-3'>
        <div className='text-B1B16'>나의 활동</div>
        <MyProfileLink href='#' title='나의 로그' />
        <MyProfileLink href='#' title='나의 커뮤니티' />
        <MyProfileLink href='#' title='내가 쓴 댓글' />
        <MyProfileLink href='#' title='관심 로그' />
        <MyProfileLink href='#' title='최근 본 로그' />
        <MyProfileLink href='#' title='최근 본 커뮤니티' />
      </div>
      <Hr />
      <div className='flex flex-col gap-3'>
        <MyProfileLink
          href='/mypage/policy'
          title='이용약관&개인정보 처리 방침'
        />
        <MyProfileLogout />
        <MyProfileLink href='/mypage/delete-account' title='회원탈퇴' />
      </div>
    </ProfileContainer>
  );
}
