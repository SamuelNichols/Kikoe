import { useEffect } from 'react'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle'
import { useStore } from './store'
import { YoutubeURLInput } from './components/YoutubeURLInput'
import { YouTubePlayer } from './components/YoutubePlayer'

function clearVideoId() {
  useStore.setState({ videoId: null });
}

function App() {
  const theme = useStore(s => s.theme);
  const videoId = useStore(s => s.videoId);

  // set the theme to the document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className="top-bar">
        <h1>Shadowing Buddy</h1>
        <ThemeToggle />
      </div>
      <YoutubeURLInput />
      {/* only show the player if there is a video id */}
      {videoId && <YouTubePlayer />}
      <button onClick={clearVideoId}>Clear Video ID</button>
    </>
  )
}

export default App
