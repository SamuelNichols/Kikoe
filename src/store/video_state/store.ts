import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { initialVideoState, type VideoState } from './config';

// Only enable devtools in development mode
const withDevtools: typeof devtools =
  import.meta.env.MODE === 'development' ? devtools : ((fn: any) => fn) as typeof devtools

  export const useVideoStateStore = create<VideoState>()(
    withDevtools(
    persist(
      (set): VideoState => ({
        ...initialVideoState,
        setVideoId: (id) => set({ videoId: id }),
        setCaptions: (captions) => set({ captions }),
      }),
      {
        name: 'video-state',      // localStorage key
        partialize: (s) => ({videoId: s.videoId, captions: s.captions }),
      }
    ), { name: 'VideoStateStore' })
  );