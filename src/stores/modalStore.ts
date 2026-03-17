import { create } from 'zustand';

type Modal = null | 'boardManagement' | 'login';

interface ModalState {
  modalState: Modal;
  setModalState: (modal: Modal) => void;
}

const useModalStore = create<ModalState>(set => ({
  modalState: null,
  setModalState: (modalState: Modal) => set({ modalState })
}));

export default useModalStore;
