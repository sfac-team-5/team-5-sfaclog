'use client';

import React from 'react';

interface ViewObserverProps {
  logId: string;
}

function ViewObserver({ logId }: ViewObserverProps) {
  if (typeof window !== 'undefined') {
    const recentlyView = localStorage.getItem('watch');
    if (!recentlyView) {
      localStorage.setItem('watch', JSON.stringify([]));
    } else {
      const recentlyViewArr = JSON.parse(recentlyView);
      const newRecentlyViewArr = Array.from(
        new Set([...recentlyViewArr, logId]),
      );

      localStorage.setItem('watch', JSON.stringify(newRecentlyViewArr));
    }
  }
  // useEffect(() => {}, []);

  return null;
}

export default ViewObserver;
