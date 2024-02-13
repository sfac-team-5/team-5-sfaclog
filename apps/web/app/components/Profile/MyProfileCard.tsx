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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`,
  );
  if (!response.ok) return {};
  return response.json();
};

export async function MyProfileCard() {
  const session = await auth();
  if (!session) return null;

  const user = await getUserInfo(session?.user.id);

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
        <ProfileFlwFlwer
          follow={user.followingCount}
          follower={user.followerCount}
        />
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
