import React from 'react';
import MyLog from './(components)/MyLog';
import MyProfile from './(components)/MyProfile';

function MyPage() {
  // next authr가 Id줄거에요
  const nextAuthId = 'an6xvwgrbnfcsu8';
  return (
    <main>
      <MyLog userId={nextAuthId} />
      <MyProfile userId={nextAuthId} />
    </main>
  );
}

export default MyPage;
