import { useEffect, useState } from "react";
import { useVideoStateStore } from "../store/video_state/store";
import { getCaptions } from "../lib/captions";

const CaptionBlock = () => {
  const captions = useVideoStateStore((s) => s.captions);
  const setCaptions = useVideoStateStore((s) => s.setCaptions);
  const videoId = useVideoStateStore((s) => s.videoId);
  const [availableCaptions, setAvailableCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>("");

  // clear captions when videoId changes
  function clearCaptions() {
    setCaptions({});
  }

  // fetch captions when videoId changes
  useEffect(() => {
    if (videoId) {
      clearCaptions();
      console.log("Fetching captions for videoId: ", videoId);
      getCaptions(videoId, "ja")
        .then((data) => {
          const captionsMap = data.reduce(
            (acc, item) => ({
              ...acc,
              [item.key]: item.value,
            }),
            {}
          );
          setCaptions(captionsMap);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      clearCaptions();
    }
  }, [videoId]);

  // update available captions when captions change
  useEffect(() => {
    if (captions && Object.keys(captions).length > 0) {
      const keys = Object.keys(captions);
      setAvailableCaptions(keys);
      setSelectedCaption(keys[0]);
    } else {
      setAvailableCaptions([]);
      setSelectedCaption("");
    }
  }, [captions]);

  // if no captions are available, show a message
  // !captions[selectedCaption] is a workaround to avoid a race condition
  // where the captions are not yet available when the component is mounted or selectedCaption is changed
  if (!captions || !selectedCaption || !captions[selectedCaption]) {
    return (
      <div>
        <h2>No captions available</h2>
      </div>
    );
  }

  // if captions are available, show the captions
  return (
    <div>
      <h2>Captions {selectedCaption}</h2>
      <select
        value={selectedCaption}
        onChange={(e) => setSelectedCaption(e.target.value)}
      >
        {availableCaptions.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div>
        {captions[selectedCaption].map((c, index) => (
          <div key={index}>{c.text}</div>
        ))}
      </div>
    </div>
  );
};

export default CaptionBlock;
