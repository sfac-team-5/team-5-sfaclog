import {
  Hr,
  ProfileContainer,
  ProfileIntro,
  ProfileSNS,
  ProfileCareer,
  UserProfileLogs,
} from './(components)';
import PocketBase from 'pocketbase';
import { CareerType, UserType } from '@/types';
import { auth } from '@/auth';
import UserFlwFlwerContainer from './(components)/UserFlwFlwerContainer';

interface UserProfileProps {
  user: UserType;
  isFollowing?: boolean;
}

const getRecentLogs = async (id: string) => {
  'use server';
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const records = await pb.collection('logs').getList(1, 3, {
      filter: `user="${id}"`,
    });
    return records.items.map(item => ({
      id: item.id,
      title: item.title,
      imageUrl: pb.files.getUrl(item, item.thumbnail, {
        thumb: '40x40',
      }),
      updated: item.updated,
    }));
  } catch (error) {
    return [];
  }
};

export async function UserProfileCard({ user, isFollowing }: UserProfileProps) {
  const session = await auth();
  const userLogs = await getRecentLogs(user.id);

  return (
    <ProfileContainer>
      <ProfileIntro
        username={user.nickname || 'error'}
        userintro={user.intro || '자기소개를 작성해주세요.'}
        imageUrl={
          user.avatar && user.avatar.length > 0
            ? `${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185`
            : 'error'
        }
      />

      <UserFlwFlwerContainer
        currentUser={session?.user.id}
        logUser={user.id}
        initialFollowerCount={user.followerCount}
        initialFollowingCount={user.followingCount}
        isFollowing={isFollowing}
      />

      {user.sns && (
        <>
          <Hr />
          <ProfileSNS sns={user.sns} />
        </>
      )}
      {user.career &&
        Object.entries(user.career as CareerType[]).length !== 0 && (
          <>
            <Hr />
            <ProfileCareer career={user.career} />
          </>
        )}

      {userLogs && (
        <>
          <Hr />
          <UserProfileLogs userLogs={userLogs} />
        </>
      )}
    </ProfileContainer>
  );
}
