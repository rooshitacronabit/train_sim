import { useEffect, useState } from "react";
import { useGlobalContext } from "../Hooks";

export const SignalPopup = () => {
    const [functionName, setFunctionName] = useState("Play");

    const {popUpContent, setPopUpVisible } = useGlobalContext();
    
    var audio = new Audio(`./audio/${popUpContent?.audioPath}`);
    const playAudio = () => {
        setFunctionName("Replay")
        audio.play();
    }

    // setTimeout(() => {
    //     setPopUpVisible(false)
    // }, 100 * 100)
    const closePopUp = () => {
        setPopUpVisible(false)
    }

    return (
        <div className="popUpContainer">
            <div className="notification-banner">
                <div className="icon">
                    <img src={popUpContent?.imagePath} alt={popUpContent?.label} />
                    {/* <img src="./S-37.jpg" alt={popUpContent?.label} /> */}

                </div>
                <div className="notification-content">
                    <h2 className="notification-title">{popUpContent?.label}</h2>
                    <p className="notification-body">{popUpContent?.content}</p>
                    {/* <h2 className="notification-title">S-37</h2>
                    <p className="notification-body">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ipsam obcaecati repellendus voluptates repudiandae minima, nesciunt amet. Minima quibusdam dicta, possimus consequuntur necessitatibus voluptatum, porro soluta, doloribus labore perferendis officiis?</p> */}

                </div>

                <div className="popup-buttons">
                    <audio src={`./audio/${popUpContent?.audioPath}`} autoPlay hidden></audio>
                    <button className="block-btn" onClick={() => closePopUp()}>Close</button>
                    {/* <button className="allow-btn" onClick={() => playAudio()}>{functionName}</button> */}
                </div>
            </div>
        </div>
    )
}