import { NotificationBox } from './(components)/NotificationBox';
import { NotificationSection } from './(components)/NotificationSection';
import { WidgetHeader } from './WidgetHeader';

interface WidgetProps {
  type: '알림' | '메시지';
}

export function Widget({ type }: WidgetProps) {
  return (
    <div className='absolute z-[100] h-[720px] w-[360px] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <WidgetHeader type={type} />

      <div>
        <NotificationSection />
        <NotificationBox unread={true} />
        <NotificationBox unread={true} />
        <NotificationBox unread={false} />
        <NotificationBox unread={true} />
      </div>
    </div>
  );
}
