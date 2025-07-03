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

interface UiProps {
  name: string;
  CLI: string;
}

export const Ui: React.FC<UiProps> = ({ name, CLI }) =>  {
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const[isLineDropdownOpen, setIsLineDropdownOpen] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [totalTime, setTotalTime] = useState<string | null>(null);
  


const saveRouteData = async ({
  name,
  CLI,
  route,
  line,
  startTime,
  endTime,
  totalTime,
}: {
  name: string;
  CLI: string;
  route: string;
  line: string;
  startTime: string | null;
  endTime: string | null;
  totalTime: string | null;
}) => {
  console.log("Saving data:", { name, CLI, route, line, startTime, endTime, totalTime  });

  const formData = new FormData();
  formData.append("name", name);
  formData.append("CLI", CLI);
  formData.append("route", route);
  formData.append("line", line);
  formData.append("startTime", startTime || "");
  formData.append("endTime", endTime || "");
  formData.append("totalTime", totalTime || "");


  try {
    const res = await fetch("http://localhost/train_sim_sunr/server/saveRouteData.php", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.message === "Route data saved successfully") {
        console.log("Route data saved successfully");
      } else {
        alert("Error: " + responseData.message);
      }
    } else {
      alert("Failed to save route data");
    }
  } catch (err) {
    console.error("Error saving route data", err);
  }
};

    const updateCurRoot = useCallback(
      (Routename: string) => {
        const now = new Date().toISOString();
        setStartTime(now); // record start time
    
        setSelctedRootName(Routename);
        setRailWayRoot(railwayRoots[Routename]?.lines);
        setIsDropdownOpen(false);

      },
      []
    );

const updateCurLine = useCallback(
  async (Linename: string) => {
    if (currentLine === Linename) return; // Avoid redundant updates

    const indexes = railWayLines[Linename];
    const oldIndexes =
      railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];

    if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
      toast("Train is on the line", { type: "error" });
      return;
    }

    // Update physics and line
    setStopPhysics(false);
    setIsLineDropdownOpen(false);

    setCurrentLine(Linename); // Update the current line

  },
  [currentLine, railPaths, setStopPhysics, setCurrentLine]
);


const handleReset = () => {
  const now = new Date().toISOString();
  setEndTime(now); // Record the end time

  if (startTime && selctedRootName && currentLine) {
    const durationMs = new Date(now).getTime() - new Date(startTime).getTime();
    const duration = (durationMs / 1000).toFixed(2) + " seconds";
    setTotalTime(duration);

    // Save the data
    saveRouteData({
      name,
      CLI,
      route: selctedRootName,
      line: currentLine,
      startTime: startTime,
      endTime: now,
      totalTime: duration,
    });
  }

  // Reload the page
  location.reload();
};
const updateTrainState = useCallback(
  (next: TrainState) => {
    if (next === state || !trainStates.includes(state)) return;
    if (!currentLine) {
      toast("Please select a line first", { type: "warning" });
      return;
    }

    setState(next); // Update the state
    console.log("Train state updated to:", next); // Debugging log
  },
  [state, setState, currentLine]
);

  const hideTheControll = useCallback(() => {
    setControllbar(!controllbar);
  }, [controllbar]);



  function getState(name) {
    if (name === "forward") {
      return <FastForward />;
    } else if (name === "reverse") {
      return <FastRewind />;
    } else {
      return <Block />;
    }
  }

  const [isCamDropdownOpen, setIsCamDropdownOpen] = useState(false);

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
         
          <button key={"reset"} onClick={() => handleReset()}>
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

