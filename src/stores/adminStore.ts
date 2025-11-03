import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface adminState {
  adminState: boolean;
  login: () => void;
  logout: () => void;
}

const useAdminStore = create(
  persist<adminState>(
    set => ({
      adminState: false,
      login: () => set({ adminState: true }),
      logout: () => set({ adminState: false })
    }),
    {
      name: 'admin-state-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useAdminStore;
