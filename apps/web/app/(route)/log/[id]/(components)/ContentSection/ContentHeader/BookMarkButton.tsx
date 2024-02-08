import React, { useState, useEffect } from 'react';

import { IconBookmarkBlue, IconBookmarkGray } from '@repo/ui/Icon';

interface BookMarkButtonProps {
  logId: string;
}

export default function BookMarkButton({ logId }: BookMarkButtonProps) {
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/log/bookmarks/${logId}`);
      if (!response.ok) return alert('북마크를 불러오는데 실패했습니다!');
      const { isBookmark } = await response.json();
      // 처음 확인용
      setIsBookmark(isBookmark);
    };
    fetchData();
  }, []);

  const onClick = async () => {
    const response = await fetch(`/api/log/bookmarks/${logId}`, {
      method: 'PATCH',
    });
    if (!response.ok) return alert('북마크 실패!');
    // 업데이트용
    setIsBookmark(pre => !pre);
  };

  return (
    <button
      onClick={onClick}
      className='border-neutral-10 flex size-10 items-center justify-center rounded-[6px] border'
    >
      <div className='size-3'>
        {isBookmark ? <IconBookmarkBlue /> : <IconBookmarkGray />}
      </div>
    </button>
  );
}
