import { auth } from '@/auth';
import { GroupedNotificationsType, NotificationType } from '@/types';
import { groupNotificationsByDate } from '@/utils/groupNotificationsByDate';

import { NotificationBox } from './(components)/NotificationBox';
import { NotificationSection } from './(components)/NotificationSection';
import { NoData } from './NoData';
import { WidgetHeader } from './WidgetHeader';

interface FetchDataResponse {
  records: NotificationType[];
}

const fetchData = async (): Promise<FetchDataResponse> => {
  const session = await auth();

  if (!session || !session.user) {
    console.error('Session is null or session.user is undefined.');
    return { records: [] };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification`,
    {
      headers: {
        userid: session.user.id,
      },
    },
  );

  if (!response.ok) return { records: [] };
  return response.json();
};

export async function NotificationWidget() {
  const notifications = await fetchData();
  const groupedNotifications: GroupedNotificationsType =
    groupNotificationsByDate(notifications.records);

  return (
    <div className='absolute z-[100] h-[720px] w-[360px] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <WidgetHeader type={'알림'} />

      {notifications.records.length === 0 ? (
        <NoData type='알림' />
      ) : (
        <div className='scrollbar-hide h-[calc(100%-89px)] overflow-auto scroll-smooth'>
          {groupedNotifications.today.length > 0 && (
            <>
              <NotificationSection label='오늘' />
              {groupedNotifications.today.map(notification => (
                <NotificationBox
                  key={notification.id}
                  isRead={!notification.isRead}
                  content={notification.content}
                  created={notification.created}
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
                  isRead={!notification.isRead}
                  content={notification.content}
                  created={notification.created}
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
                  isRead={!notification.isRead}
                  content={notification.content}
                  created={notification.created}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
