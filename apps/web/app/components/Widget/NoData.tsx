import { WidgetType } from '@/types';
import { IconGroupGray } from '@repo/ui/Icon';

interface NoDataProps {
  type: WidgetType;
}

export function NoData({ type }: NoDataProps) {
  const message =
    type === '알림'
      ? '아직 도착한 알림이 없습니다.'
      : '아직 도착한 메시지가 없습니다.';

  return (
    <div className='mt-[162px] flex h-full flex-col items-center gap-8'>
      <IconGroupGray />
      <p>{message}</p>
    </div>
  );
}
