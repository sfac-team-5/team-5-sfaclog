import { create } from 'zustand';

interface TargetType {
  type:
    | 'log-delete'
    | 'user-block'
    | 'log-cancel'
    | 'comment-delete'
    | 'reply-comment-delete'
    | null;
  logId?: string;
  commentId?: string;
  userId?: string;
  userName?: string;
}

interface State {
  target: TargetType;
}

interface Actions {
  actions: {
    onChange: ({ type, logId, commentId, userId }: TargetType) => void;
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
  },
  actions: {
    onChange: ({ type, logId, commentId, userId, userName }: TargetType) =>
      set(state => ({
        target: { ...state.target, type, logId, commentId, userId, userName },
      })),
    onReset: () =>
      set({
        target: {
          type: null,
          logId: '',
          commentId: '',
          userId: '',
          userName: '',
        },
      }),
  },
}));

export const useModalData = () => useModalDataStore(state => state.target);
export const useModalDataActions = () =>
  useModalDataStore(state => state.actions);
