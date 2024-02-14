import { MyProfileCard } from '@/components/Profile/MyProfileCard';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='container mb-[150px] mt-20 flex gap-[83px]'>
      <MyProfileCard />
      {children}
    </main>
  );
}
