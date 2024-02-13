import { DeleteAccountType } from '@/(route)/mypage/delete-account/action';
import { create } from 'zustand';

interface TargetType {
  type:
    | 'log-delete'
    | 'user-block'
    | 'log-cancel'
    | 'comment-delete'
    | 'reply-comment-delete'
    | 'delete-account'
    | 'follower-delete'
    | null;
  logId?: string;
  commentId?: string;
  userId?: string;
  userName?: string;
  accountInfo?: DeleteAccountType;
  targetId?: string;
  action: any;
}

interface State {
  target: TargetType;
}

interface Actions {
  actions: {
    onChange: ({
      type,
      logId,
      commentId,
      userId,
      accountInfo,
      targetId,
      action,
    }: TargetType) => void;
    onReset: () => void;
  };
}

const useModalDataStore = create<State & Actions>()(set => ({
  target: {
    type: null,
    logId: '',
    commentId: '',
    userId: '',
    userName: '',
    accountInfo: {
      reason: '',
      password: '',
      email: '',
    },
    targetId: '',
    action: null,
  },
  actions: {
    onChange: ({
      type,
      logId,
      commentId,
      userId,
      userName,
      accountInfo,
      targetId,
    }: TargetType) =>
      set(state => ({
        target: {
          ...state.target,
          type,
          logId,
          commentId,
          userId,
          userName,
          accountInfo,
          targetId,
        },
      })),
    onReset: () =>
      set({
        target: {
          type: null,
          logId: '',
          commentId: '',
          userId: '',
          userName: '',
          accountInfo: {
            reason: '',
            password: '',
            email: '',
          },
          targetId: '',
          action: null,
        },
      }),
  },
}));

export const useModalData = () => useModalDataStore(state => state.target);
export const useModalDataActions = () =>
  useModalDataStore(state => state.actions);
