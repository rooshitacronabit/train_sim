import * as THREE from "three";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Hooks";
import {
  railWayLineNames,
  railWayLines,
  railwayRoots,
  TrainState,
  trainStates,
} from "../common";
import { SpeedoMeter } from "./SpeedoMeter";
import { SignalPopup } from "./SignalPopup";
import EngineAudioComponent from "./EnginSound";
import { Horn } from "./Horn";
import Tooltip from "@mui/material/Tooltip";
import {
  Autorenew,
  Adb,
  FastForward,
  FastRewind,
  Block,
  AltRoute,
  VideoCameraBack,
  QuestionMark,
  ForkRight,
} from "@mui/icons-material";

export function Ui() {
  const {
    trackEnd,
    camera,
    setCamera,
    cameras,
    setStopPhysics,
    state,
    setState,
    railPaths,
    isDebug,
    setDebug,
    setPath,
    currentLine,
    setCurrentLine,
    setIsReverse,
    popUpVisible,
    setIsEngineAudioPlaying,
    currentSpeed,
    maxSpeed,
    setMaxSpeed
  } = useGlobalContext();
  const [controllbar, setControllbar] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [railRoot, setRailWayRoot] = useState([]);
  const [selctedRootName, setSelctedRootName] = useState("");
  const [initailScreen, SetInitailScreen] = useState(false);

  // useEffect(()=>{
  //     if(currentLine == "3 line" || currentLine == "4 line"){
  //         setIsReverse(true);
  //     }
  // },[currentLine])

  const updateTrainState = useCallback(
    (next: TrainState) => {
      // const audioElement = document.getElementById(
      //   "EngineAudio"
      // ) as HTMLAudioElement;
      // audioElement.play();
      if (next === state || !trainStates.includes(state)) return;
      if (!currentLine) {
        toast("Please select a line first", { type: "warning" });
        return;
      }

      setState(next);
      SetInitailScreen(false);
      setIsDisabled(false);
    },
    [state, setState, currentLine]
  );

  const updateCurRoot = useCallback(
    (name: string) => {
      setSelctedRootName(name);
      setRailWayRoot(railwayRoots[name]?.lines);

      setIsDropdownOpen(false);
    },
    [selctedRootName]
  );
  const updateCurLine = useCallback(
    (name: string) => {
      if (currentLine === name) {
        return;
      }
      const indexes = railWayLines[name];
      const oldIndexes =
        railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];
      if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
        toast("Train is on the line", { type: "error" });
        return;
      }
      setStopPhysics(false);
      setCurrentLine(name);
      setIsLineDropdownOpen(false);


      // name == "1 line" ||
      // name == "2 line" ||
      name == "1-line"||
      name == "2-line"||
      name == "4 line"||
      // name == "3-line"||
      name == "5 line"||
      name == "6 line"||
      name == "7 line"||
      name == "9-line"
      ?setIsReverse(true)
      :setIsReverse(false);
  
      railPaths.forEach((ref, index) => {
        // console.log("Rail path ",ref,index);

        const railPath = ref.current;
        if (!railPath) return;
        if (indexes.includes(index)) {
          railPath.enable();
        } else {
          railPath.disable();
        }
      });

      const path = new THREE.CurvePath<THREE.Vector3>();
      indexes.forEach((index, i) => {
        const railPath = railPaths[index]?.current;
        // console.log("Rail paths : ",railPath.getCurve());

        if (!railPath) return;
        path.add(railPath.getCurve());
      });

      setPath(path);
    },
    [currentLine, setCurrentLine, setStopPhysics, setPath, railPaths]
  );
  const hideTheControll = useCallback(() => {
    setControllbar(!controllbar);
  }, [controllbar]);

  const pageReolad = () => {
    location.reload();
  };

  function getState(name) {
    if (name === "forward") {
      return <FastForward />;
    } else if (name === "reverse") {
      return <FastRewind />;
    } else {
      return <Block />;
    }
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCamDropdownOpen, setIsCamDropdownOpen] = useState(false);
  const [isLineDropdownOpen, setIsLineDropdownOpen] = useState(false);
  const camreView = ["station", "Cab", "Back", "Side", "Engine Top"];
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  const handleCamMouseEnter = () => {
    setIsCamDropdownOpen(true);
  };

  const handleCamMouseLeave = () => {
    setIsCamDropdownOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setIsOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsOpen(false);
  };
  const handleLineMouseEnter = () => {
    setIsLineDropdownOpen(true);
  };
  const handleLineMouseLeave = () => {
    setIsLineDropdownOpen(false);
  };

  const IncreaseSpeed = () => {
    
    setMaxSpeed(maxSpeed+10)
  }

  const DecreaseSpeed = () => { 
    
    setMaxSpeed(maxSpeed-10)
  }
  return (
<>
      <div className="logo-container">
        <img className="logo-image" src="./logo/railway_logo.png" alt="logo" />
        <div className="logo-text">Surendranagar Yard 3D <br />Virtual Tour for LRD</div>
      </div>
      <div>{popUpVisible && <SignalPopup />}</div>
      {/* <button
        className={`controlButton ${controllbar ? "controllbuttonHidden" : "upArrow"
          }`}
        onClick={() => hideTheControll()}
      >
        {" "} */}
      {/* {!controllbar ? <div> </div> : "Hide"} controls */}
      {/* <img src="./upArrow.png" alt="Show" /> */}
      {/* </button> */}
      <div className="buttons" style={{display : !controllbar ? "none" : ""}}>
          {trainStates.map((next, index) => (
            <button
              key={"state-" + index}
              disabled={trackEnd === next}
              className={
                state === next
                  ? "active"
                  : state === next + "-signal"
                    ? "signaled"
                    : "inactive"
              }
              onClick={() => updateTrainState(next)}
            >
              {next}
            </button>
          ))}
          <div className="spacer" />
          {/* ROOTS */}
          <select
            value={selctedRootName}
            className="button"
            onChange={(e) => updateCurRoot(e.target.value)}
          // disabled={isDisabled}
          >
            <option value="">Select Route</option>
            {Object.keys(railwayRoots).map((root, index) => (
              <option key={"line-" + index} value={root}>
                {root}
              </option>
            ))}
          </select>
          {/* lINES */}
          {railRoot.map((name, index) => (
            <button
              key={"line-" + index}
              className={currentLine === name ? "active" : "inactive"}
              onClick={() => updateCurLine(name)}
            >
              {name}
            </button>
          ))}
         
          <button key={"reset"} onClick={() => pageReolad()}>
            Reset
          </button>
          <div className="spacer" />
          {cameras.map((cam, index) => (
             <button
             key={"cab-" + index}
             className={camera === cam.index ? "active dropdown-item" : "inactive dropdown-item"}
             onClick={() => { setCamera(index); setIsCamDropdownOpen(false); }}

           >
             {camreView[index]} view
           </button>
          ))}
          <div className="spacer" />
          <button
            className={isDebug ? "active" : "inactive"}
            onClick={() => setDebug(!isDebug)}
          >
            Debug
          </button>
          <SpeedoMeter />
            <button
              key={"speed+1"}
              // className={camera === cam.index ? "active dropdown-item" : "inactive dropdown-item"}
              onClick={() => IncreaseSpeed()}
            >
              +
            </button>
            <button
              key={"speed-1"}
              // className={camera === cam.index ? "active dropdown-item" : "inactive dropdown-item"}
              onClick={() => DecreaseSpeed()}
            >
              -
            </button>
          <Horn />

          <EngineAudioComponent />
        </div>
      
    </>
  );
}
const dropdownStyle = {
  position: "absolute",
  top: "0",
  left: "40px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 1,
  padding: "10px",
  borderRadius: "4px",
};

const dropdownItemStyle = {
  padding: "8px 12px",
  cursor: "pointer",
};
