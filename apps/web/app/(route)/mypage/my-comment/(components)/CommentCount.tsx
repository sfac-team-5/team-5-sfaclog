'use client';

import React, { useEffect, useState } from 'react';

interface CommentCountProps {
  logId: string;
}

function CommentCount({ logId }: CommentCountProps) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/log-comment-count?logId=${logId}`);
      if (!response.ok) return alert('데이터를 불러오는데 실패했습니다!');
      const result = await response.json();
      setCommentCount(result);
    };
    fetchData();
  }, []);

  return <span className='text-B3R12'>{commentCount}</span>;
}

export default CommentCount;
