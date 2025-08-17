import { useEffect } from 'react'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle'
import { useAppConfigStore } from './store/app_config/store'
import { YoutubeURLInput } from './components/YoutubePlayer/YoutubeURLInput'
import { YouTubePlayer } from './components/YoutubePlayer/YoutubePlayer'
import { ClearPlayerButton } from './components/YoutubePlayer/ClearPlayerButton'
import CaptionBlock from './components/CaptionBlock'

function App() {
  const theme = useAppConfigStore(s => s.theme); 
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
      <YouTubePlayer />
      <ClearPlayerButton />
      <CaptionBlock />
      </>
  )
}

export default App
