import { IconReplyArrow } from '@public/svgs';
import GhostButton from '@repo/ui/GhostButton';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ReplyCommentInputProps {
  logId: string;
  commentId: number;
}

interface CommentFormData {
  text: string;
  publicScope: boolean;
}

function ReplyCommentInput({ logId, commentId }: ReplyCommentInputProps) {
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
    await fetch(`/api/log/reply-comment/${logId}?comment-id=${commentId}`, {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-[88px] w-full items-start border-t border-neutral-10 bg-background-5 px-5 py-6'
    >
      <IconReplyArrow className='mr-[10px]' />
      <div className='flex w-full gap-3'>
        <input
          {...textRegister}
          className='h-[40px] w-full resize-none rounded-[6px] border px-4 py-2 placeholder:text-B2R14 placeholder:text-neutral-40'
          placeholder='댓글을 입력해보세요.'
        />
        <GhostButton
          type='submit'
          size='s'
          label='댓글 등록'
          className='!w-[84px] shrink-0'
        />
      </div>
    </form>
  );
}

export default ReplyCommentInput;
