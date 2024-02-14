'use client';

import { useForm } from 'react-hook-form';

import { IconSendBlue, IconSendGray } from '@repo/ui/Icon';
import { InputBox } from '@repo/ui/InputBox';

export function MessageChatForm() {
  const { register, watch } = useForm();
  const message = watch('message');

  return (
    <div className='absolute bottom-0 flex w-full items-center justify-between gap-3 px-[22px] py-3'>
      <div className='w-[270px]'>
        <InputBox {...register('message')} />
      </div>
      {message ? (
        <IconSendBlue width={45} className='cursor-pointer' />
      ) : (
        <IconSendGray width={45} className='cursor-pointer' />
      )}
    </div>
  );
}
