import Link from 'next/link';
import PopularCommunity from './(route)/main/(components)/PopularCommunity';
import PopularLogs from './(route)/main/(components)/PopularLogs';
import { MainCarousel } from './components/Carousel/MainCarousel';

export default async function Page() {
  return (
    <main>
      <Link href={'/modal'}>modal</Link>
      <MainCarousel />
      <PopularLogs />
      <PopularCommunity />
    </main>
  );
}
