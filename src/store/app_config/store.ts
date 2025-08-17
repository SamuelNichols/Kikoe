import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { AppConfigState } from './config';
import { initialAppConfigState } from './config';


// Only enable devtools in development mode
const withDevtools: typeof devtools =
  import.meta.env.MODE === 'development' ? devtools : ((fn: any) => fn) as typeof devtools

  export const useAppConfigStore = create<AppConfigState>()(
    withDevtools(
    persist(
      (set): AppConfigState => ({
        ...initialAppConfigState,
        setTheme: (theme) => set({ theme }),
        toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      }),
      {
        name: 'app-config',      // localStorage key
        partialize: (s) => ({theme: s.theme }), // only persist theme for now
      }
    ), { name: 'AppConfigStore' })
  );