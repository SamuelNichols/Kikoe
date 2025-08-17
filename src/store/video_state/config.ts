import type { CaptionsMap } from '../../lib/captions';

export interface VideoState {
    videoId: string | null;
    captions: CaptionsMap;
    // actions
    setVideoId: (id: string) => void;
    setCaptions: (captions: CaptionsMap) => void;
  }

export const initialVideoState: VideoState = {
    videoId: null,
    captions: {},
    setVideoId: () => {},
    setCaptions: () => {},
}

