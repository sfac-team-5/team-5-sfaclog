'use client';

import React from 'react';
import ModalBox from './(components)/ModalBox';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  modalLogDelete,
  modalUserBlock,
  modalLogCancel,
  modalReplyCommentDelete,
} from './index';

interface ModalStateType {
  title: string;
  description: string;
  action: (() => void) | null;
}

function Modal() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type');
  const id = params.get('id');
  const name = params.get('username');
  const commentId = params.get('comment-id');
  const userId = params.get('user-id');

  let modalState: ModalStateType = {
    title: '',
    description: '',
    action: null,
  };
  switch (type) {
    case 'log-delete':
      modalState = {
        title: modalLogDelete.title,
        description: modalLogDelete.description,
        action: () => {
          id && modalLogDelete.logDelete(id);
        },
      };

      break;
    case 'user-block':
      modalState = {
        title: name ? name + modalUserBlock.title : '',
        description: name ? name + modalUserBlock.description : '',
        action: () => {
          id && modalUserBlock.userBlock(id);
        },
      };
      break;
    case 'log-cancel':
      modalState = {
        title: modalLogCancel.title,
        description: modalLogCancel.description,
        action: () => router.push(modalLogCancel.link),
      };
      break;
    case 'reply-comment-delete':
      modalState = {
        title: modalReplyCommentDelete.title,
        description: modalReplyCommentDelete.description,
        action: () => {
          id &&
            commentId &&
            userId &&
            modalReplyCommentDelete.commentDelete(id, commentId, userId);
          router.back();
          setTimeout(() => router.refresh(), 100);
        },
      };
      break;
  }

  if (!modalState.action) return null;

  return (
    <div className='size-screen fixed inset-0 z-[100] flex items-center justify-center bg-black/30'>
      <ModalBox {...modalState} type={type} />
    </div>
  );
}

export default Modal;
