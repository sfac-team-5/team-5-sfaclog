interface MessageTimeProps {
  isRead: boolean;
  time: string;
  type: 'incoming' | 'outgoing';
}

export default function MessageTime({ isRead, time, type }: MessageTimeProps) {
  return (
    <div
      className={`text-neutral-40 text-[8px] ${type === 'outgoing' && 'text-right'}`}
    >
      {isRead && <p>읽음</p>}
      <p>{time}</p>
    </div>
  );
}
