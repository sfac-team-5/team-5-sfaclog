import Image from 'next/image';

interface AvatarProps {
  url?: string;
  size: 'large' | 'medium' | 'small' | 'xs' | number;
}

const getSizeInPixels = (
  size: 'large' | 'medium' | 'small' | 'xs' | number,
): number => {
  switch (size) {
    case 'large':
      return 80;
    case 'medium':
      return 50;
    case 'small':
      return 32;
    case 'xs':
      return 25;
    default:
      return size;
  }
};

export function Avatar({ url = '/images/Avatar.png', size }: AvatarProps) {
  const pixelSize = getSizeInPixels(size);

  return (
    <div className={`w-[${size}px]`}>
      <Image
        src={url}
        width={pixelSize}
        height={pixelSize}
        alt='profile image'
      />
    </div>
  );
}
