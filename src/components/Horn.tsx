// import { useEffect } from "react";
// import { VolumeDown,VolumeUp} from '@mui/icons-material';
// import Tooltip from "@mui/material/Tooltip";
// export const Horn = () => {

//     const shortHornbtn = document.getElementById("shortHornButton") as HTMLButtonElement;
//     const shortHornSound = document.getElementById("shortHornAudio") as HTMLAudioElement;
//     const hornbtn = document.getElementById("longHornButton") as HTMLButtonElement;
//     const longHornSound = document.getElementById("longHornAudio") as HTMLAudioElement;
//     const playShortHorn = () => {
//         if (shortHornSound) {
//             longHornSound.pause();
//             hornbtn.disabled = false
//             hornbtn.style.backgroundColor = "yellow";
//             shortHornSound.play().then(() => {
//                 shortHornbtn.disabled = true
//                 shortHornbtn.style.backgroundColor = "#FDDA0D";
//                 setTimeout(() => {
//                     shortHornbtn.disabled = false
//                     shortHornbtn.style.backgroundColor = "yellow";
//                 }, 2000)
//             }).catch((error) => {
//                 console.error("Audio playback failed:", error);
//             });
//         }


//     };
//     const playLongHorn = () => {
//         if (longHornSound) {
//             shortHornSound.pause();
//             shortHornbtn.disabled = false
//             shortHornbtn.style.backgroundColor = "yellow";
//             longHornSound.play().then(() => {
//                 hornbtn.disabled = true
//                 hornbtn.style.backgroundColor = "#FDDA0D";
//                 setTimeout(() => {
//                     hornbtn.disabled = false
//                     hornbtn.style.backgroundColor = "yellow";
//                 }, 5000)
//             }).catch((error) => {
//                 console.error("Audio playback failed:", error);
//             });
//         }
//     };

//     useEffect(() => {
//         const handleKeyDown = (event: KeyboardEvent) => {
//             if (event.code === "Space") { // Detect spacebar key press
//                 event.preventDefault(); // Prevent default scrolling
//                 playShortHorn();
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);

//         // Cleanup listener on component unmount
//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//         };
//     }, []);

//     return (
//         <>
//             <audio id="shortHornAudio" src="./audio/Short-Horn.mp3" hidden></audio>
//             <audio id="longHornAudio" src="./audio/Horn-high.mp3" hidden></audio>
//             <Tooltip title="Short Horn" arrow  placement="right"><button id="shortHornButton" onClick={playShortHorn} ><VolumeDown /></button></Tooltip>
//             <Tooltip title="Long Horn" arrow  placement="right"><button id="longHornButton" onClick={playLongHorn} ><VolumeUp /></button></Tooltip>

//         </>
//     )
// }


import { useEffect } from "react";

export const Horn = () => {

    const shortHornbtn = document.getElementById("shortHornButton") as HTMLButtonElement;
    const shortHornSound = document.getElementById("shortHornAudio") as HTMLAudioElement;
    const hornbtn = document.getElementById("longHornButton") as HTMLButtonElement;
    const longHornSound = document.getElementById("longHornAudio") as HTMLAudioElement;
    const playShortHorn = () => {
        if (shortHornSound) {
            longHornSound.pause();
            hornbtn.disabled = false
            hornbtn.style.backgroundColor = "yellow";
            shortHornSound.play().then(() => {
                shortHornbtn.disabled = true
                shortHornbtn.style.backgroundColor = "#FDDA0D";
                setTimeout(() => {
                    shortHornbtn.disabled = false
                    shortHornbtn.style.backgroundColor = "yellow";
                }, 2000)
            }).catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }


    };
    const playLongHorn = () => {
        if (longHornSound) {
            shortHornSound.pause();
            shortHornbtn.disabled = false
            shortHornbtn.style.backgroundColor = "yellow";
            longHornSound.play().then(() => {
                hornbtn.disabled = true
                hornbtn.style.backgroundColor = "#FDDA0D";
                setTimeout(() => {
                    hornbtn.disabled = false
                    hornbtn.style.backgroundColor = "yellow";
                }, 5000)
            }).catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") { // Detect spacebar key press
                event.preventDefault(); // Prevent default scrolling
                playShortHorn();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <audio id="shortHornAudio" src="./audio/Short-Horn.mp3" hidden></audio>
            <audio id="longHornAudio" src="./audio/Horn-high.mp3" hidden></audio>
            <button id="shortHornButton" onClick={playShortHorn} style={{ backgroundColor: "#daad30", color: "black" }}>Short Horn</button>
            <button id="longHornButton" onClick={playLongHorn} style={{ backgroundColor: "#daad30", color: "black" }}>Long Horn</button>

        </>
    )
}
{/* <img src="./icons/volume.png" alt="vloume" width="32" height="32" /> */ }