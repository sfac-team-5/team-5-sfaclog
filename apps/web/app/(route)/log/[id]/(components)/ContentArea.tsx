'use client';

import React from 'react';
import DOMPurify from 'dompurify';

interface ContentAreaProps {
  logContent: string;
}

function ContentArea({ logContent }: ContentAreaProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(logContent),
      }}
    ></div>
  );
}

export default ContentArea;
