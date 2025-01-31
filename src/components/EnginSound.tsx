import React, { useState } from "react";
import { useGlobalContext } from "../Hooks";
import { Train} from '@mui/icons-material';
import Tooltip from "@mui/material/Tooltip";

const EngineAudioComponent = () => {
    const { isEngineAudioPlaying, setIsEngineAudioPlaying } = useGlobalContext();
    const [] = useState(false);
    const engineAudio = document.getElementById("EngineAudioBtn")

    const toggleAudio = () => {
        const audioElement = document.getElementById("EngineAudio") as HTMLAudioElement;
        if (audioElement) {
            if (isEngineAudioPlaying) {
                audioElement.play().then(() => {
                    // engineAudio.style.backgroundColor = "#F6F6F6"
                    // engineAudio.style.color = "black"
                }).catch((error) => console.error("Audio playback failed:", error));
            } else {
                audioElement.pause();
                // engineAudio.style.backgroundColor = "#6D6D6D"
                // engineAudio.style.color = "#E23D28"
            }
            setIsEngineAudioPlaying(!isEngineAudioPlaying);
        }
    };
    

    return (
        <div>
            <audio id="EngineAudio" src="./audio/running.mp3" loop hidden></audio>
            <button id="EngineAudioBtn" onClick={toggleAudio} >
                {/* <img src="./icons/train.png" alt="train" width="32" height="32" /> */}
                {/* <span > */}
                <Tooltip title={isEngineAudioPlaying ? "Unmute Engine" : "Mute Engine"} arrow  placement="right">
                   {isEngineAudioPlaying?
                  <Train sx={{ color: '#7e7e7e'}}/>  
                :
                 <Train />
                } 
                </Tooltip>
                    {/* {isEngineAudioPlaying ? "Unmute Engine" : "Mute Engine"} */}
                {/* </span> */}

            </button>
        </div>
    );
};

export default EngineAudioComponent;