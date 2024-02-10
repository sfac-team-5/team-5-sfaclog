import React from 'react';
import {
  Hr,
  ProfileContainer,
  ProfileFlwFlwer,
  ProfileIntro,
  ProfileSNS,
  ProfileCareer,
  UserProfileLogs,
} from './components';
import PocketBase from 'pocketbase';
import NotFound from '@/(route)/test/carousel/not-found';
import { UserType } from '@/types';
import { ButtonRound } from '@repo/ui/ButtonRound';
interface UserProfileProps {
  user: UserType;
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
export async function UserProfileCard({ user }: UserProfileProps) {
  const userLogs = await getRecentLogs(user.id);
  // if (!userLogs) return NotFound();
  return (
    <ProfileContainer>
      <ProfileIntro
        username={user.nickname}
        userintro={user.intro}
        imageUrl={`${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185`}
      />
      <div className='mt-6'>
        <ProfileFlwFlwer follow={24} follower={999} />
      </div>
      <div className='mt-6 grid grid-cols-2 gap-2'>
        <ButtonRound type='filled'>팔로우</ButtonRound>
        <ButtonRound type='outline'>제안하기</ButtonRound>
      </div>

      {user.sns && (
        <>
          <Hr />
          <ProfileSNS sns={user.sns} />
        </>
      )}
      {Object.entries(user.career).length !== 0 && (
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
