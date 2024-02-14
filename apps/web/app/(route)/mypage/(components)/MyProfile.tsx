import PocketBase from 'pocketbase';
import NotFound from '../../../not-found';

interface MyProfileProps {
  userId: string;
}

const fetchData = async (userId: string) => {
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
};

async function MyProfile({ userId }: MyProfileProps) {
  const profile = await fetchData(userId);
  if (!profile) return NotFound();

  return (
    <aside className='h-[963px] w-[245px] shrink-0 bg-blue-400'>
      MyProfile
    </aside>
  );
}

export default MyProfile;
