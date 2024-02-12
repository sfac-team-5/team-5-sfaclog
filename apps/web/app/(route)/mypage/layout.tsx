import { auth } from '@/auth';
import { MyProfileCard } from '@/components/Profile/MyProfileCard';
const getUserInfo = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`,
    { cache: 'no-cache' },
  );
  if (!response.ok) return {};
  const result = await response.json();
  return result;
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return null;
  const user = await getUserInfo(session?.user.id);

  return (
    <main className='container mb-[150px] mt-20 flex gap-[83px]'>
      <MyProfileCard user={user} />
      {children}
    </main>
  );
}
