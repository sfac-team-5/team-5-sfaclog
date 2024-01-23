import React from 'react';
import PopularLogs from './(components)/PopularLogs';
import RecentlyLogs from './(components)/RecentlyLogs';
import FollowingLogs from './(components)/FollowingLogs';
import CommunityList from './(components)/CommunityList';
import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';

function MainPage() {
  const 서버컴포넌트_로그인_확인_함수 = () => {
    try {
      const pb = new PocketBase('http://3.35.176.72:8090');

      const cookie = cookies().get('newjeans');
      pb.authStore.loadFromCookie(cookie?.value || '');
      return pb.authStore.isValid ? pb.authStore.model : null;
    } catch (err) {
      console.log('getUserDetails error:', err);
      return null;
    }
  };

  const user = 서버컴포넌트_로그인_확인_함수();

  return (
    <main>
      <PopularLogs />
      <RecentlyLogs />
      <FollowingLogs user={user?.id} />
      <CommunityList />
    </main>
  );
}

export default MainPage;
