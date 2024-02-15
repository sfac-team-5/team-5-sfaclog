import PocketBase from 'pocketbase';

import {
  ProfileContainer,
  ProfileIntro,
  Hr,
  ProfileFlwFlwer,
  MyProfileHeader,
  ProfileCareer,
  MyProfileLink,
} from './(components)';
import { MyProfileLogout } from './(components)/MyProfileLogout';
import { auth } from '@/auth';

const getUserInfo = async (id: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const record = await pb.collection('users').getOne(id, {
      fields: '*',
    });

    const avatarFilename = record.avatar;
    record.avatarUrl = pb.files.getUrl(record, avatarFilename, {
      thumb: '300x300',
    });

    return record;
  } catch (error) {
    return null;
  }
};

export async function MyProfileCard() {
  const session = await auth();
  if (!session) return null;

  const user = await getUserInfo(session?.user.id);
  if (!user) return null;

  return (
    <ProfileContainer>
      <MyProfileHeader updateMyPofileLink='#' />
      <ProfileIntro
        username={user.nickname || 'error'}
        userintro={user.intro || '자기소개를 작성해주세요.'}
        imageUrl={
          user.avatar && user.avatar.length > 0
            ? `${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185`
            : 'error'
        }
      />
      <div className='mt-6'>
        <ProfileFlwFlwer userId={user.id} />
      </div>
      {user.career && Object.entries(user.career).length !== 0 && (
        <>
          <Hr />
          <ProfileCareer career={user.career} />
        </>
      )}
      <Hr />
      <div className='flex flex-col gap-3'>
        <div className='text-B1B16'>나의 활동</div>
        <MyProfileLink href='/mypage/my-log' title='나의 로그' />
        <MyProfileLink href='/mypage/my-community' title='나의 커뮤니티' />
        <MyProfileLink href='/mypage/my-comment' title='내가 쓴 댓글' />
        <MyProfileLink href='#' title='관심 로그' />
        <MyProfileLink href='/mypage/recently-log' title='최근 본 로그' />
        <MyProfileLink
          href='/mypage/recently-community'
          title='최근 본 커뮤니티'
        />
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
