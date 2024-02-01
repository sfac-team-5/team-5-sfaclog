import { NotificationBox } from './(components)/NotificationBox';
import { NotificationSection } from './(components)/NotificationSection';
import { NoData } from './NoData';
import { WidgetHeader } from './WidgetHeader';

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification`,
  );
  if (!response.ok) return [];
  return response.json();
};

export async function NotificationWidget() {
  const notifications = await fetchData();

  return (
    <div className='absolute z-[100] h-[720px] w-[360px] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <WidgetHeader type={'알림'} />

      <NoData type='알림' />
      <div>
        {/* <NotificationSection />
        <NotificationBox unread={true} />
        <NotificationBox unread={true} />
        <NotificationBox unread={false} />
        <NotificationBox unread={true} /> */}
      </div>
    </div>
  );
}
