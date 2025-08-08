// src/components/YouTubePlayer.tsx
import { useEffect, useId, useRef } from 'react';
import { useStore } from '../store';

// declare global window object for youtube iframe api
export {}; // ensure module
declare global {
  // expose narrow subset we need
  interface Window {
    // declare the youtube iframe api
    YT: {
      Player: new (el: HTMLElement, opts: any) => any;
    };
    // declare the global callback for the youtube iframe api
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer() {
  const videoId = useStore(s => s.videoId);
  // container for the player
  const containerRef = useRef<HTMLDivElement>(null);
  // player instance
  const playerRef = useRef<any>(null);
  // element id for the player
  const elementId = useId();

  // load API once
  useEffect(() => {
    if (window.YT?.Player) return; // already loaded
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return; // already loaded

    console.log('loading youtube iframe api');

    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.async = true;
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }, []);

  // create / update player when videoId changes
  useEffect(() => {
      // clear -> destroy player and clear container
    if (!videoId) {
      try { playerRef.current?.destroy?.() } finally { playerRef.current = null }
      if (containerRef.current) containerRef.current.innerHTML = ''
      return
    }

    const create = () => {
      // reuse or create a dedicated inner node
      if (!containerRef.current) return
      // if a player already exists, just load the new id
      if (playerRef.current) {
        // try to load the new video id
        try { playerRef.current.loadVideoById(videoId); return } catch {}
        // if that fails, destroy the player and clear the container
        try { playerRef.current.destroy?.() } catch {}
        playerRef.current = null
        containerRef.current.innerHTML = ''
      }

      // create a new player targeting the actual element
      const target = document.createElement('div') // not managed by React
      // append the new player to the container
      containerRef.current.appendChild(target)
      playerRef.current = new window.YT.Player(target, {
        videoId,
        playerVars: { autoplay: 1, modestbranding: 1 }
      })
    }

    if (window.YT?.Player) {
      create();
    } else {
      // wait until global callback fires (StrictMode safe)
      window.onYouTubeIframeAPIReady = create;
    }
  }, [videoId, elementId]);

  // destroy player on unmount
  useEffect(() => {
    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch (_) {
        // ignore
      } finally {
        playerRef.current = null;
      }
    };
  }, []);

  // keep 16:9 aspect
  return (
    <div
      id={elementId}
      ref={containerRef}
      style={{ width: '100%', aspectRatio: '16 / 9', marginTop: '1rem' }}
    />
  );
}
