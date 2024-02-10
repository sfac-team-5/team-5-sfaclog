import { NotificationWidget } from '@/components/Widget/NotificationWidget';
import { IconAlramLineBlack } from '@repo/ui/Icon';

interface NavNotificationProps {
  userid: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function NavNotification({
  userid,
  isOpen,
  onToggle,
  onClose,
}: NavNotificationProps) {
  return (
    <div className='relative'>
      <IconAlramLineBlack className='cursor-pointer' onClick={onToggle} />
      {isOpen && <NotificationWidget userid={userid} onClose={onClose} />}
    </div>
  );
}
