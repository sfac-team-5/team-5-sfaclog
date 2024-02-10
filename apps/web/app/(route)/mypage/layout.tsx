import { MyProfileCard } from '@/components/Profile/MyProfileCard';
const getUserInfo = async (id: string) => {
  //임시 profile 용도
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
  const nextAuthId = 'an6xvwgrbnfcsu8';
  const user = await getUserInfo('an6xvwgrbnfcsu8');
  return (
    <main className='container my-20 flex gap-[83px]'>
      <MyProfileCard user={user} />
      {children}
    </main>
  );
}
