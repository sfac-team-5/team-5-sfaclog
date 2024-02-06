import React from 'react';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

interface ContentAreaProps {
  logContent: string;
}

function ContentArea({ logContent }: ContentAreaProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify(new JSDOM('<!DOCTYPE html>').window).sanitize(
          logContent,
        ),
      }}
    ></div>
  );
}

export default ContentArea;
