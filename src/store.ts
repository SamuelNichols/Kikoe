import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Only enable devtools in development mode
const withDevtools: typeof devtools =
  import.meta.env.MODE === 'development' ? devtools : ((fn: any) => fn) as typeof devtools

type Theme = 'light' | 'dark'

interface AppState {
    videoId: string | null;
    theme: Theme;
    // actions
    setVideoId: (id: string) => void;
    toggleTheme: () => void;
  }

  export const useStore = create<AppState>()(
    withDevtools(
    persist(
      (set) => ({
        videoId: null,
        theme: 'light',
  
        setVideoId: (id) => set({ videoId: id }),
  
        toggleTheme: () =>
          set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      }),
      {
        name: 'jp-shadow-settings',      // localStorage key
        partialize: (s) => ({ theme: s.theme }), // only persist theme for now
      }
    ), { name: 'ZustandStore' })
  );