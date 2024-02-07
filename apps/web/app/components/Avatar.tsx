import Image from 'next/image';

interface AvatarProps {
  type?: 'all' | 'user';
  url?: string;
  size: keyof typeof avatarSize | number;
}

const avatarSize = {
  xs: 25,
  s: 32,
  m: 50,
  l: 80,
};

export function Avatar({
  size,
  type = 'user',
  url = '/images/Avatar.png',
}: AvatarProps) {
  const pixelSize = typeof size === 'number' ? size : avatarSize[size];

  return (
    <div
      style={{
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
      }}
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
