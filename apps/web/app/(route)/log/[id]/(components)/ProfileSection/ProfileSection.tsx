import NotFound from '@/not-found';
import { UserType } from '@/types';
import { ButtonRound } from '@repo/ui/ButtonRound';
import Image from 'next/image';
import PocketBase from 'pocketbase';

interface ProfileSectionProps {
  user: UserType;
}

const fetchData = async (id: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const records = await pb.collection('logs').getList(1, 3, {
      filter: `user="${id}"`,
    });

    return records.items;
  } catch (error) {
    return [];
  }
};

async function ProfileSection({ user }: ProfileSectionProps) {
  const userLogs = await fetchData(user.id);
  if (!userLogs) return NotFound();

  return (
    <div className='shadow-custom w-[245px] px-5 pt-5'>
      <div className='border-neutral-10 mb-6 space-y-6 border-b pb-4'>
        <div className='overflow-hidden rounded-md'>
          {/* <Image
          src={session?.user.image || ''}
          alt='avatar'
          width={185}
          height={185}
        /> */}
          <Image
            src={`${process.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=185x185`}
            alt='avatar'
            width={185}
            height={185}
          />
        </div>
        <div className='text-text-primary space-y-3'>
          <span className='text-B1B16'>{user.nickname}</span>
          <p className='text-B2R14'>{user.intro}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <ButtonRound type='filled'>팔로우</ButtonRound>
          <ButtonRound type='outline'>제안하기</ButtonRound>
        </div>
      </div>
      <div className='border-neutral-10 mb-6 space-y-6 border-b pb-6'>
        <span className='text-B1B16'>SNS</span>
        <div>{/* sns 아이콘 */}</div>
      </div>
      <div className='border-neutral-10 mb-6 space-y-3 border-b pb-5'>
        <span className='text-B1B16'>경력사항</span>
        <div>{/* 경력사항 */}</div>
      </div>
      <div className=' mb-[38px] space-y-[17px]'>
        <div className='flex items-center justify-between'>
          <span className='text-B1B16 text-text-primary'>작성한글</span>
          <span className='text-B3R12 text-text-gray'>더보기</span>
        </div>
        <ul className='space-y-4'>
          {userLogs.map((log: any) => (
            <li key={log.id} className='flex gap-[10px]'>
              <Image
                src={`${process.env.POCKETBASE_URL}/api/files/logs/${log.id}/${log.thumbnail}?thumb=40x40`}
                alt='logImage'
                width={40}
                height={40}
                className='rounded-md'
              />
              <div className='flex flex-col gap-[2px]'>
                <span className='text-B2R14 text-text-primary'>
                  {log.title.length > 12
                    ? log.title.substr(0, 12) + '...'
                    : log.title}
                </span>
                <span className='text-B3R12 text-text-secondary'>
                  {log.created.substr(0, 10)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileSection;
