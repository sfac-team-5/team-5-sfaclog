'use client';

import React, { useEffect, useState } from 'react';

interface ViewCounterProps {
  logId: string;
}

function ViewCounter({ logId }: ViewCounterProps) {
  const [view, setView] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/log/views/${logId}`, {
        method: 'PATCH',
      });
      if (!response.ok) return alert('조회수를 불러오는데 실패했습니다!');
      const result = await response.json();

      setView(result);
    };
    fetchData();
  }, []);

  return <div>{view}</div>;
}

export default ViewCounter;
