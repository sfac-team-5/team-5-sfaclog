'use client';

import { IconHeartBlack, IconHeartBlue } from '@repo/ui/Icon';
import React, { useState, useEffect } from 'react';

interface HeartButtonProps {
  logId: string;
}

function HeartButton({ logId }: HeartButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setisLike] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/log/likes/${logId}`);
      if (!response.ok) return alert('좋아요수를 불러오는데 실패했습니다!');
      const { likes, isLike } = await response.json();
      // 처음 확인용
      setLikeCount(likes);
      setisLike(isLike);
    };
    fetchData();
  }, []);

  const onClick = async () => {
    const response = await fetch(`/api/log/likes/${logId}`, {
      method: 'PATCH',
    });
    if (!response.ok) return alert('좋아요 실패!');
    const { likes } = await response.json();
    // 업데이트용
    setLikeCount(likes);
    setisLike(pre => !pre);
  };

  return (
    <div
      onClick={onClick}
      className='flex cursor-pointer items-center gap-1 rounded-full border px-4 py-[10px]'
    >
      <span className='size-4'>
        {isLike ? <IconHeartBlue /> : <IconHeartBlack />}
      </span>
      <span className='text-B3R12 text-neutral-70'>
        {likeCount > 999 ? '999+' : likeCount}
      </span>
    </div>
  );
}

export default HeartButton;
