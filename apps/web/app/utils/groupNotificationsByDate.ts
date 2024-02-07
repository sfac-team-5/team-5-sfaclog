import { GroupedNotificationsType, NotificationType } from '@/types';

export const groupNotificationsByDate = (notifications: NotificationType[]) => {
  const groups: GroupedNotificationsType = {
    today: [],
    lastSevenDays: [],
    lastThirtyDays: [],
  };

  // date 비교할 때 시간은 제외하고 날짜로만 비교하기 위해서 setHours(0, 0, 0, 0)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneDay = 24 * 60 * 60 * 1000;
  const sevenDaysAgo = new Date(today.getTime() - 7 * oneDay);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * oneDay);

  notifications.forEach((notification: NotificationType) => {
    const createdDate = new Date(notification.created);
    createdDate.setHours(0, 0, 0, 0);

    if (createdDate.getTime() === today.getTime()) {
      groups.today.push(notification);
    } else if (createdDate >= sevenDaysAgo && createdDate < today) {
      groups.lastSevenDays.push(notification);
    } else if (createdDate >= thirtyDaysAgo && createdDate < sevenDaysAgo) {
      groups.lastThirtyDays.push(notification);
    }
  });

  return groups;
};
