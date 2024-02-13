'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { IconCheckBoxBlue, IconCheckBoxGray } from '@repo/ui/Icon';
import GhostButton from '@repo/ui/GhostButton';

interface CommentInputProps {
  logId: string;
}

export interface CommentFormData {
  text: string;
  publicScope: boolean;
}

function CommentInput({ logId }: CommentInputProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<CommentFormData>({
      defaultValues: {
        text: '',
        publicScope: true,
      },
    });
  const isChecked = watch('publicScope');

  const onSubmit: SubmitHandler<CommentFormData> = async data => {
    await fetch(`/api/log/comment/${logId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      reset();
      router.refresh();
    });
  };

  const handleScopeClick = () => {
    setValue('publicScope', !isChecked);
  };
  const textRegister = register('text', {
    required: '댓글을 입력해주세요.',
  });

  const scopeRegister = register('publicScope');

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...textRegister}
        className='placeholder:text-B2R14 placeholder:text-neutral-40 h-[80px] resize-none rounded-[6px] border px-4 py-2'
        placeholder='댓글을 입력해보세요.'
      />
      <div className='flex items-center justify-between'>
        <label className='flex cursor-pointer items-center gap-2'>
          <input
            {...scopeRegister}
            type='checkbox'
            className='hidden'
            onClick={handleScopeClick}
          />
          <div className='size-6'>
            {!isChecked ? <IconCheckBoxBlue /> : <IconCheckBoxGray />}
          </div>
          <span className='text-B3R12'>댓글 비공개</span>
        </label>
        <GhostButton
          type='submit'
          size='s'
          label='댓글 등록'
          className='!w-[84px]'
        />
      </div>
    </form>
  );
}

export default CommentInput;
