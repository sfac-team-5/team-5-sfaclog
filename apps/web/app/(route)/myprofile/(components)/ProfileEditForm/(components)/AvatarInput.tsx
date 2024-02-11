import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';

import { UserType } from '@/types';
import AvatarImage from '@/components/AvatarImage';
import { Avatar } from '@/components/Avatar';

interface AvatarInputProps {
  register: UseFormRegisterReturn<'avatar'>;
  watch: UseFormWatch<UserType>;
  avatarUrl: string;
}

function AvatarInput({ register, watch, avatarUrl }: AvatarInputProps) {
  const [newPrevAvatar, setNewPrevAvatar] = useState('');
  const previewAvatar = watch('avatar');

  useEffect(() => {
    // 사용자가 새 이미지를 선택했을 경우, 미리보기 URL을 생성
    if (
      previewAvatar &&
      previewAvatar.length > 0 &&
      previewAvatar[0] instanceof File
    ) {
      const file = previewAvatar[0];
      const previewURL = URL.createObjectURL(file as File);
      setNewPrevAvatar(previewURL);
    } else {
      // 새 이미지가 선택되지 않았을 경우, avatarUrl을 사용
      setNewPrevAvatar(avatarUrl);
    }
  }, [previewAvatar, avatarUrl]);

  return (
    <div className='flex w-[155px] flex-col gap-3'>
      <div className='size-[155px] overflow-hidden rounded-md'>
        {newPrevAvatar.length !== 0 ? (
          <Image
            src={newPrevAvatar}
            width={0}
            height={0}
            sizes='100%'
            className='size-full object-cover'
            alt=''
          />
        ) : (
          // <AvatarImage />
          <div className='bg-neutral-5 flex size-full items-center justify-center'>
            <Avatar size={80} />
          </div>
        )}
      </div>
      <input
        {...register}
        type='file'
        id='profileAvatar'
        className='hidden'
        accept='image/*'
      />
      <label
        htmlFor='profileAvatar'
        className='flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#eee]'
      >
        프로필 사진 변경
      </label>
      <p className='text-B5R10 text-neutral-40'>
        20MB 이내의 이미지 파일을
        <br />
        업로드 해 주세요.
      </p>
    </div>
  );
}

export default AvatarInput;
