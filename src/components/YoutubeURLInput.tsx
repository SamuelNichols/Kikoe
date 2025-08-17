// src/components/UrlInput.tsx
import { useRef } from 'react';
import { useVideoStateStore } from '../store/video_state/store';

// Match common YouTube URL forms and capture the 11-char video id as a named group
const YT_ID_PATTERN = /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)(?<id>[A-Za-z0-9_-]{11})/;

export function YoutubeURLInput() {
  const ref = useRef<HTMLInputElement>(null);
  const setVideoId = useVideoStateStore(s => s.setVideoId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = ref.current?.value.trim() ?? '';
    const id = value.match(YT_ID_PATTERN)?.groups?.id ?? value; // allow raw ID fallback
    if (id.length === 11) {
      setVideoId(id);
      ref.current!.value = '';
    } else {
      alert('Invalid YouTube URL or ID');
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: '1rem' }}>
      <input
        ref={ref}
        placeholder="Paste YouTube URL or ID"
        style={{ width: '60%' }}
        autoFocus
      />
      <button type="submit">Load</button>
    </form>
  );
}