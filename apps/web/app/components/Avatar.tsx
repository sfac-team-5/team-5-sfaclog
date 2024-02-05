import Image from 'next/image';

interface AvatarProps {
  type?: 'all' | 'user';
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

export function Avatar({
  type = 'user',
  url = '/images/Avatar.png',
  size,
}: AvatarProps) {
  const pixelSize = getSizeInPixels(size);

  return (
    <div
      style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
      className='overflow-hidden rounded-full'
    >
      {type === 'user' ? (
        <Image
          src={url}
          width={pixelSize}
          height={pixelSize}
          alt='profile image'
          sizes='100%'
          className='size-full object-cover'
        />
      ) : (
        <div className='bg-brand-90 text-H2M20 flex size-full items-center justify-center rounded-full font-semibold text-white'>
          ALL
        </div>
      )}
    </div>
  );
}
