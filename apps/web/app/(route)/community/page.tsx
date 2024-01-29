import React from 'react';
import CommunityNavigation from './(components)/CommunityNavigation';
import CommunityList from './(components)/CommunityList';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/community?sorted=hi`,
  );
  if (!response.ok) return [];
  return response.json();
};

async function CommunityPage() {
  const communityList = await fetchData();

  return (
    <main>
      <CommunityNavigation />
      <CommunityList communityList={communityList} />
    </main>
  );
}

export default CommunityPage;
