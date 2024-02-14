import PocketBase from 'pocketbase';
import NotFound from '@/not-found';
import CommunityNavigation from './(components)/CommunityNavigation';
import CommunityList from './(components)/CommunityList';

const fetchData = async () => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const records = await pb.collection('communities').getList(1, 5, {
      sort: '-likes',
      expand: 'author',
    });
    return records.items;
  } catch (error) {
    return [];
  }
};

async function CommunityPage() {
  const communityList = await fetchData();
  if (communityList.length === 0) return NotFound();

  return (
    <main className='container'>
      <CommunityNavigation />
      <CommunityList communityList={communityList} />
    </main>
  );
}

export default CommunityPage;
