import React from 'react';
import PopularLogs from './(components)/PopularLogs';
import RecentlyLogs from './(components)/RecentlyLogs';
import FollowingLogs from './(components)/FollowingLogs';
import CommunityList from './(components)/CommunityList';

function MainPage() {
  return (
    <main>
      <PopularLogs />
      <RecentlyLogs />
      <FollowingLogs />
      <CommunityList />
    </main>
  );
}

export default MainPage;
