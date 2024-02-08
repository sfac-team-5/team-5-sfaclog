import { IconMessageLine } from '@repo/ui/Icon';
import { MessageWidget } from '@/components/Widget/MessageWidget';

interface NavMessageProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function NavMessage({ isOpen, onToggle, onClose }: NavMessageProps) {
  return (
    <div className='relative'>
      <IconMessageLine className='cursor-pointer' onClick={onToggle} />
      {isOpen && <MessageWidget onClose={onClose} />}
    </div>
  );
}
