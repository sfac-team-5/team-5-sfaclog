import Image from 'next/image';

interface AvatarProps {
  url?: string;
  size: number;
}

export function Avatar({ url = '/images/Avatar.png', size }: AvatarProps) {
  return (
    <div>
      <Image src={url} width={size} height={size} alt='profile image' />
    </div>
  );
}
