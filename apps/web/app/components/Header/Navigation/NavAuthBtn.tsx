'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';

import { ButtonRound } from '@repo/ui/ButtonRound';
import { NavNotification } from './NavNotification';
import { NavProfile } from './NavProfile';
import { NavMessage } from './NavMessage';
import { usePathname } from 'next/navigation';

interface NavAuthBtnProps {
  session: Session | null;
}

export function NavAuthBtn({ session }: NavAuthBtnProps) {
  const pathname = usePathname();
  const [openWidget, setOpenWidget] = useState<
    '알림' | '메시지' | '드롭다운' | null
  >(null);

  const handleOpenWidget = (
    widgetName: '알림' | '메시지' | '드롭다운' | null,
  ) => {
    setOpenWidget(current => (current === widgetName ? null : widgetName));
  };

  const handleCloseWidget = () => {
    setOpenWidget(null);
  };

  useEffect(() => {
    setOpenWidget(null);
  }, [pathname]);

  return (
    <div>
      {session?.user ? (
        <div className='flex items-center gap-5'>
          <NavNotification
            userid={session.user.id}
            isOpen={openWidget === '알림'}
            onToggle={() => handleOpenWidget('알림')}
            onClose={handleCloseWidget}
          />
          <NavMessage
            isOpen={openWidget === '메시지'}
            onToggle={() => handleOpenWidget('메시지')}
            onClose={handleCloseWidget}
          />
          <NavProfile
            image={session.user.image || ''}
            isOpen={openWidget === '드롭다운'}
            onToggle={() => handleOpenWidget('드롭다운')}
          />
        </div>
      ) : (
        <div className='flex w-[171px] grow items-center gap-2'>
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
