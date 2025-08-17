import { useEffect } from 'react'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle'
import { useAppConfigStore } from './store/app_config/store'
import { useVideoStateStore } from './store/video_state/store'
import { YoutubeURLInput } from './components/YoutubeURLInput'
import { YouTubePlayer } from './components/YoutubePlayer'
import { getCaptions } from './lib/captions'
import CaptionBlock from './components/CaptionBlock'

function clearVideoId() {
  useVideoStateStore.setState({ videoId: null });
}

function App() {
  const theme = useAppConfigStore(s => s.theme);
  const videoId = useVideoStateStore(s => s.videoId);
  const captions = useVideoStateStore(s => s.captions);
  const setCaptions = useVideoStateStore(s => s.setCaptions);

  // set the theme to the document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  function clearCaptions() {
    setCaptions({});
  }

  // testing getCaptions function
  useEffect(() => {
    if (videoId) {
      clearCaptions();
      console.log("Fetching captions for videoId: ", videoId);
      getCaptions(videoId, "ja").then(data => { 
        const captionsMap = data.reduce((acc, item) => ({
          ...acc,
          [item.key]: item.value
        }), {});
        setCaptions(captionsMap);
      }).catch(error => {
        console.error("Error: ", error);
      });
    } else {
      clearCaptions();
    }
  }, [videoId]);

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
      <CaptionBlock captions={captions}/>
      </>
  )
}

export default App
