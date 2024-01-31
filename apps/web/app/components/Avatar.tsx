import AvatarImage from './AvatarImage';

interface AvatarProps {
  size: number;
}

export function Avatar({ size }: AvatarProps) {
  return (
    <div>
      <AvatarImage size={size} />
    </div>
  );
}
