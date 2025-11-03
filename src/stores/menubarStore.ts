import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MenubarState {
  isActive: boolean;
  setActive: (isActive: boolean) => void;
}

const useMenubarStore = create(
  persist<MenubarState>(
    set => ({
      isActive: false,
      setActive: (isActive: boolean) => set({ isActive })
    }),
    {
      name: 'menubar-state-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMenubarStore;
