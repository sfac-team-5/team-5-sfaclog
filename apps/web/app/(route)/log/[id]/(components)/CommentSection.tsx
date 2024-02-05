import Button from '@repo/ui/Button';
import { IconCheckBoxBlue } from '@repo/ui/Icon';
import { InputBox } from '@repo/ui/InputBox';
import React from 'react';
import { LogComment } from './LogComment';

interface CommentSectionProps {
  logId: string;
}

const fetchData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`,
  );
  if (!response.ok) return null;
  return response.json();
};

async function CommentSection({ logId }: CommentSectionProps) {
  const comments = await fetchData(logId);

  return (
    <div>
      <div className='space-y-5'>
        <span>댓글()</span>
        <InputBox />
        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='hidden' />
            <IconCheckBoxBlue />
            <span className='text-B3R12'>댓글 비공개</span>
          </label>
          <Button type='button' size='s' label='댓글 등록' />
        </div>
      </div>
      <ul>
        <LogComment />
      </ul>
    </div>
  );
}

export default CommentSection;
