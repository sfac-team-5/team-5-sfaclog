import { IconReplyArrow } from '@public/svgs';
import Button from '@repo/ui/Button';
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
        <Button type='submit' size='s' label='댓글 등록' />
      </div>
    </form>
  );
}

export default ReplyCommentInput;

// function CommentInput({ logId }: CommentInputProps) {

//   return (
//     <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
//       <textarea
//         {...textRegister}
//         className='h-[80px] resize-none rounded-[6px] border px-4 py-2 placeholder:text-B2R14 placeholder:text-neutral-40'
//         placeholder='댓글을 입력해보세요.'
//       />
//       <div className='flex items-center justify-between'>
//         <label className='flex items-center gap-2'>
//           <input
//             {...scopeRegister}
//             type='checkbox'
//             className='hidden'
//             onClick={handleScopeClick}
//           />
//           {!isChecked ? <IconCheckBoxBlue /> : <IconCheckBoxGray />}
//           <span className='text-B3R12'>댓글 비공개</span>
//         </label>
//         <Button type='submit' size='s' label='댓글 등록' />
//       </div>
//     </form>
//   );
// }

// export default CommentInput;
