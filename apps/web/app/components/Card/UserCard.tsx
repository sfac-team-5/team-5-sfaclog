import React from 'react';
import { Avatar } from '../Avatar';
import { CardTag } from './(components)/CardTag';
interface UserCardProps {
  nickname: string;
  interests: string[];
  intro: string;
}

export function UserCard({ interests, intro, nickname }: UserCardProps) {
  return (
    <div className='shadow-custom flex h-[208px] w-[307px] flex-col bg-white p-5'>
      <div className='flex items-center gap-2'>
        <div>
          <Avatar size='m' type='user' />
        </div>
        <div className='text-B1B16'>{nickname}</div>
      </div>
      <div className='mt-2 flex gap-2'>
        {interests.map(item => (
          <CardTag key={item} tag={item} />
        ))}
      </div>
      <div className='mt-6'>{intro || '등록된 소개가 없습니다.'}</div>
    </div>
  );
}
