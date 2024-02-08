import Link from 'next/link';

import { auth } from '@/auth';
import { ButtonRound } from '@repo/ui/ButtonRound';
import { NavNotification } from './NavNotification';
import { NavProfile } from './NavProfile';
import { NavMessage } from './NavMessage';

export async function NavAuthBtn() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className='flex items-center gap-5'>
          <NavNotification userid={session.user.id} />
          <NavMessage />
          <NavProfile image={session.user.image || ''} />
        </div>
      ) : (
        <div className='flex gap-2'>
          <ButtonRound type='outline'>
            <Link href={'/login'}>로그인</Link>
          </ButtonRound>
          <ButtonRound type='filled'>
            <Link href={'/signup/policy'}>회원가입</Link>
          </ButtonRound>
        </div>
      )}
    </div>
  );
}
