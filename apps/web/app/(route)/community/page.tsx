import React from 'react';
import CommunityNavigation from './(components)/CommunityNavigation';
import CommunityList from './(components)/CommunityList';
import { SectionHeader } from '@/components/SectionHeader';

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
      <SectionHeader title='커뮤니티' />
      <CommunityList communityList={communityList} />
    </main>
  );
}

export default CommunityPage;
