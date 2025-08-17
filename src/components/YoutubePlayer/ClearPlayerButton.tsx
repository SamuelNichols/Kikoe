import { useVideoStateStore } from "../../store/video_state/store";

export const ClearPlayerButton = () => {
    const setVideoId = useVideoStateStore(s => s.setVideoId);

    function clearPlayer() {
        setVideoId(null);
    }

    return <button onClick={clearPlayer}>Clear Player</button>
}