import { create } from 'zustand';

interface DataType {
  title: string;
  description: string;
  action: any;
}

interface State {
  data: DataType;
}

interface Actions {
  actions: {
    onChange: ({ title, description, action }: DataType) => void;
    onReset: () => void;
  };
}

const useModalStore = create<State & Actions>()(set => ({
  data: {
    title: '',
    description: '',
    action: null,
  },
  actions: {
    onChange: ({ title, description, action }: DataType) =>
      set({
        data: {
          title,
          description,
          action,
        },
      }),
    onReset: () =>
      set({
        data: {
          title: '',
          description: '',
          action: null,
        },
      }),
  },
}));

export const useModalData = () => useModalStore(state => state.data);
export const useModalDataActions = () => useModalStore(state => state.actions);
