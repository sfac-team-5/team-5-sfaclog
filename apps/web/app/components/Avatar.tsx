import Image from 'next/image';

interface AvatarProps {
  url?: string;
  size: number;
}

export function Avatar({ url = '/images/Avatar.png', size }: AvatarProps) {
  return (
    <div className={`w-[${size}px]`}>
      <Image src={url} width={size} height={size} alt='profile image' />
    </div>
  );
}
