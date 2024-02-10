'use client';

import React from 'react';
import ModalBox from './(components)/ModalBox';
import { useRouter } from 'next/navigation';
import {
  modalLogDelete,
  modalUserBlock,
  modalLogCancel,
  modalReplyCommentDelete,
  modalCommentDelete,
} from './index';
import { useModalData } from '@/hooks/stores/useModalDataStore';

interface ModalStateType {
  title: string;
  description: string;
  action: (() => void) | null;
}

function Modal() {
  const router = useRouter();
  const { type, logId, commentId, userId, userName } = useModalData();

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
          logId && modalLogDelete.logDelete(logId);
        },
      };
      break;
    case 'user-block':
      modalState = {
        title: userName + modalUserBlock.title,
        description: userName + modalUserBlock.description,
        action: () => {
          userId && modalUserBlock.userBlock(userId);
        },
      };
      break;
    case 'log-cancel':
      modalState = {
        title: modalLogCancel.title,
        description: modalLogCancel.description,
        action: () => {
          router.push(modalLogCancel.link);
        },
      };
      break;
    case 'comment-delete':
      modalState = {
        title: modalCommentDelete.title,
        description: modalCommentDelete.description,
        action: () => {
          logId &&
            commentId &&
            userId &&
            modalCommentDelete.commentDelete(logId, commentId, userId);
          router.back();
          setTimeout(() => router.refresh(), 100);
        },
      };
      break;
    case 'reply-comment-delete':
      modalState = {
        title: modalReplyCommentDelete.title,
        description: modalReplyCommentDelete.description,
        action: () => {
          logId &&
            commentId &&
            userId &&
            modalReplyCommentDelete.commentDelete(logId, commentId, userId);
          router.back();
          setTimeout(() => router.refresh(), 100);
        },
      };
      break;
  }

  if (type === null) return;

  return (
    <div className='size-screen fixed inset-0 z-[100] flex items-center justify-center bg-black/30'>
      <ModalBox {...modalState} type={type} />
    </div>
  );
}

export default Modal;
