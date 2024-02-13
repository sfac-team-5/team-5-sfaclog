import PopularCommunity from './(route)/main/(components)/PopularCommunity';
import PopularLogs from './(route)/main/(components)/PopularLogs';
import { MainCarousel } from './components/Carousel/MainCarousel';
import Footer from './components/Footer/Footer';

export default async function Page() {
  return (
    <>
      <main>
        <MainCarousel />
        <PopularLogs />
        <PopularCommunity />
      </main>
      <Footer />
    </>
  );
}
