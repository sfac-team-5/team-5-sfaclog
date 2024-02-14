import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

import { GroupedNotificationsType, NotificationType } from '@/types';
import { groupNotificationsByDate } from '@/utils/groupNotificationsByDate';

import { NotificationBox } from './(components)/NotificationBox';
import { NotificationSection } from './(components)/NotificationSection';
import { WidgetHeader } from './WidgetHeader';
import { NoData } from './NoData';

interface NotificationWidgetProps {
  userid: string;
  onClose: () => void;
}

export function NotificationWidget({
  userid,
  onClose,
}: NotificationWidgetProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const groupedNotifications: GroupedNotificationsType =
    groupNotificationsByDate(notifications);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

        const records: NotificationType[] = await pb
          .collection('notifications')
          .getFullList({
            filter: `userId="${userid}" && created>="${thirtyDaysAgoISO}"`,
            sort: '-created',
          });

        setNotifications(records);
      } catch (error: any) {
        console.log(error);
        const errorData = error.originalError.data;
        const firstKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstKey as string].message;

        const status = error.originalError.status || 400;
        const message = errorMessage || 'An unexpected error occurred';

        console.log(status, message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className='absolute right-0 z-[2] mt-4 h-[720px] w-[360px] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
        <WidgetHeader type={'알림'} onClose={onClose} />
        <div className='border-neutral-10 flex h-[calc(100%-90px)] items-center justify-center border-t'>
          <svg
            aria-hidden='true'
            className='size-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute right-0 z-[2] mt-4 h-[720px] w-[360px] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <WidgetHeader type={'알림'} onClose={onClose} />

      {notifications.length === 0 ? (
        <NoData type='알림' />
      ) : (
        <div className='scrollbar-hide h-[calc(100%-89px)] overflow-auto scroll-smooth'>
          {groupedNotifications.today.length > 0 && (
            <>
              <NotificationSection label='오늘' />
              {groupedNotifications.today.map(notification => (
                <NotificationBox
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </>
          )}

          {groupedNotifications.lastSevenDays.length > 0 && (
            <>
              <NotificationSection label='최근 7일' />
              {groupedNotifications.lastSevenDays.map(notification => (
                <NotificationBox
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </>
          )}

          {groupedNotifications.lastThirtyDays.length > 0 && (
            <>
              <NotificationSection label='최근 30일' />
              {groupedNotifications.lastThirtyDays.map(notification => (
                <NotificationBox
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
