import React from 'react';
import Image from 'next/image';

interface ContentThumbnailProps {
  logId: string;
  logThumbnail: string;
}

function ContentThumbnail({ logId, logThumbnail }: ContentThumbnailProps) {
  return (
    <div className='relative aspect-square w-full'>
      <Image
        src={`${process.env.POCKETBASE_URL}/api/files/logs/${logId}/${logThumbnail}`}
        alt='thumbnail'
        fill
        objectFit='cover'
      />
    </div>
  );
}

export default ContentThumbnail;
