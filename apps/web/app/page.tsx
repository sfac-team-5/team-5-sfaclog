import { CommunityCard } from './components/Card/CommunityCard';
import { LogCard } from './components/Card/LogCard';
import { MainCarousel } from './components/Carousel/MainCarousel';
import { LogType } from './types';

export default async function Page() {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log?sorted=popular`,
    );
    if (!response.ok) return [];
    return response.json();
  };

  const popularLogs = await fetchData();

  return (
    <main>
      <MainCarousel />

      <div className='container mt-[72px] grid grid-cols-3 gap-6'>
        {popularLogs.length == 0 ? (
          <div>로그가 없습니다.</div>
        ) : (
          popularLogs.map((log: LogType) => {
            return <LogCard key={log.collectionId} log={log}></LogCard>;
          })
        )}
      </div>

      <div className='container mb-20 mt-[72px] flex flex-col gap-6'>
        <CommunityCard />
        <CommunityCard />
      </div>
    </main>
  );
}
