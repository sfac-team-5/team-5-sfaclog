import PocketBase from 'pocketbase';

import { UserType } from '@/types';
import { auth } from '@/auth';
import NotFound from '@/not-found';
import ProfileEditForm from './(components)/ProfileEditForm/ProfileEditForm';

async function fetchData(userId: string) {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const record = await pb.collection('users').getOne(userId, {
      fields: '*',
    });

    const avatarFilename = record.avatar;
    record.avatarUrl = pb.files.getUrl(record, avatarFilename, {
      thumb: '300x300',
    });

    return record;
  } catch (error) {
    return null;
  }
}

async function page() {
  const session = await auth();
  if (!session) return NotFound();

  const profile = await fetchData(session?.user.id);
  if (!profile) return NotFound();

  return (
    <div>
      <ProfileEditForm profile={profile as UserType} />
    </div>
  );
}

export default page;
