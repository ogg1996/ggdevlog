import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface adminState {
  adminState: boolean;
  setAdminState: (state: boolean) => void;
}

const useAdminStore = create(
  persist<adminState>(
    set => ({
      adminState: false,
      setAdminState: (state: boolean) => set({ adminState: state })
    }),
    {
      name: 'admin-state-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useAdminStore;
