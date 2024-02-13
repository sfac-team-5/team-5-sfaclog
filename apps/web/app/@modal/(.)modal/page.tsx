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
  modalAccountDelete,
  modalFollowerDelete,
} from './index';
import { useModalData } from '@/hooks/stores/useModalDataStore';

interface ModalStateType {
  title: string;
  description: string;
  action: (() => void) | null;
}

function Modal() {
  const router = useRouter();
  const { type, logId, commentId, userId, userName, accountInfo, targetId } =
    useModalData();

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
          if (!logId) return;
          modalLogDelete.logDelete(logId);
        },
      };
      break;
    case 'user-block':
      modalState = {
        title: userName + modalUserBlock.title,
        description: userName + modalUserBlock.description,
        action: () => {
          if (!userId) return;
          modalUserBlock.userBlock(userId);
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
          if (!logId || !commentId || !userId) return;
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
          if (!logId || !commentId || !userId) return;
          modalReplyCommentDelete.commentDelete(logId, commentId, userId);
          router.back();
          setTimeout(() => router.refresh(), 100);
        },
      };
      break;
    case 'delete-account':
      modalState = {
        title: modalAccountDelete.title,
        description: modalAccountDelete.description,
        action: () => {
          if (!accountInfo) return;
          modalAccountDelete.accountDelete(accountInfo);
          router.push('/');
        },
      };
      break;
    case 'follower-delete':
      modalState = {
        title: modalFollowerDelete.title,
        description: modalFollowerDelete.description,
        action: () => modalFollowerDelete.followerDelete(),
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
