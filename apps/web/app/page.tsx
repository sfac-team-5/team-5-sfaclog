import { CommunityCard } from './components/Card/CommunityCard';
import { LogCard } from './components/Card/LogCard';
import { MainCarousel } from './components/Carousel/MainCarousel';
import { CommunityType, LogType } from './types';

export default async function Page() {
  const fetchData = async () => {
    const fetchLogData = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
    ).then(response => (response.ok ? response.json() : []));
    const fetchCommunityData = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/community?sorted=popular`,
    ).then(response => (response.ok ? response.json() : []));

    const [popularLogs, popularCommunities] = await Promise.all([
      fetchLogData,
      fetchCommunityData,
    ]);
    return { popularLogs, popularCommunities };
  };

  const { popularLogs, popularCommunities } = await fetchData();

  return (
    <main>
      <MainCarousel />

      <div className='container mt-[72px] grid grid-cols-3 gap-6'>
        {popularLogs.length == 0 ? (
          <div>로그가 없습니다.</div>
        ) : (
          popularLogs.map((log: LogType) => {
            return <LogCard key={log.collectionId} log={log} />;
          })
        )}
      </div>

      <div className='container mb-20 mt-[72px] flex flex-col gap-6'>
        {popularLogs.length == 0 ? (
          <div>커뮤니티 게시글이 없습니다.</div>
        ) : (
          popularCommunities.map((community: CommunityType) => {
            return (
              <CommunityCard
                key={community.collectionId}
                community={community}
              />
            );
          })
        )}
      </div>
    </main>
  );
}
