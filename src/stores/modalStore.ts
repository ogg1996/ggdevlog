import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Modal = null | 'menu' | 'boardManagement' | 'login';

interface ModalState {
  modalState: Modal;
  setModalState: (modal: Modal) => void;
}

const useModalStore = create(
  persist<ModalState>(
    set => ({
      modalState: null,
      setModalState: (modalState: Modal) => set({ modalState })
    }),
    {
      name: 'modal-state-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useModalStore;
