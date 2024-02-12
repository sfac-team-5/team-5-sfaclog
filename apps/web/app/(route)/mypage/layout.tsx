import MyProfile from './(components)/MyProfile';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextAuthId = 'an6xvwgrbnfcsu8';

  return (
    <main className='container flex gap-[83px] pb-[120px] pt-20'>
      <MyProfile userId={nextAuthId} />
      {children}
    </main>
  );
}
