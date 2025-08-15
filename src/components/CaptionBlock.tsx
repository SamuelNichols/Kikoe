import { useEffect, useState } from "react";
import type { CaptionsMap } from "../lib/captions";    

const CaptionBlock = ({ captions }: { captions: CaptionsMap | undefined }) => {
    const [availableCaptions, setAvailableCaptions] = useState<string[]>([]);
    const [selectedCaption, setSelectedCaption] = useState<string>("");

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

    if (!captions || !selectedCaption || !captions[selectedCaption]) {
        return (
            <div>
                <h2>No captions available</h2>
            </div>
        );
    }
    return (
        <div>
            <h2>Captions {selectedCaption}</h2>
            <select value={selectedCaption} onChange={(e) => setSelectedCaption(e.target.value)}>
                {availableCaptions.map((key) => (
                    <option key={key} value={key}>{key}</option>
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