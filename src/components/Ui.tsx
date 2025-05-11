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

export function Ui({name,department}) {
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
  

  // useEffect(()=>{
  //     if(currentLine == "3 line" || currentLine == "4 line"){
  //         setIsReverse(true);
  //     }
  // },[currentLine])

  // const saveRouteData = async () => {
  //   const startTime = new Date().toISOString();
  //   const endTime = new Date().toISOString();

  //   const data = {
  //     selectedRoute: selctedRootName,
  //     selectedLine: currentLine,
  //     department,
  //     startTime,
  //     endTime,
  //   };

  //   try {
  //     const response = await fetch("http://localhost/train_sim_sunr/server/saveRouteData.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Data saved successfully:", result);
  //     } else {
  //       console.error("Failed to save data");
  //     }
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };



// async function saveRouteData(data) {
//   try {
//     // Replace '/save-data' with the correct endpoint URL
//     const response = await fetch('http://localhost/train_sim_sunr/server/saveRouteData.php', {
//       method: 'POST', // Or the appropriate HTTP method
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       // Handle other potential errors, not just 404
//       throw new Error(`Error saving data: HTTP status ${response.status}`);
//     }

//     // Handle successful save
//     console.log('Data saved successfully!');

//   } catch (error) {
//     console.error('Error saving data:', error.message);
//   }
// }
// async function saveRouteData(data) {
//   console.log("Sending data to backend:", data); // Log the data being sent

//   try {
//     const response = await fetch('http://localhost/train_sim_sunr/server/saveRouteData.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     console.log("Response status:", response.status); // Log the response status

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response from backend:", errorText); // Log the error response
//       throw new Error(`Error saving data: HTTP status ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Data saved successfully:", result); // Log the success response
//   } catch (error) {
//     console.error("Error saving data:", error.message); // Log the error
//   }
// }

// async function saveRouteData(name, department) {
//  // Debugging log
//   const formData = new FormData();
//   formData.append("name", name);
//   formData.append("department", department);
//   try {
//     const response = await fetch('http://localhost/train_sim_sunr/server/saveRouteData.php', {
//       method: 'POST',
//       // headers: {
//       //   'Content-Type': 'application/json',
//       // },s
//       body: formData,
//     });

//     console.log("Response status:", response.status); // Log the response status

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response from backend:", errorText); // Log the error response
//       throw new Error(`Error saving data: HTTP status ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Data saved successfully:", result); // Log the success response
//   } catch (error) {
//     console.error("Error saving data:", error.message); // Log the error
//   }
// }

const saveRouteData = async () => {
  const name = localStorage.getItem("name") || "";
  const department = localStorage.getItem("department") || "";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("department", department);
  formData.append("state", state);
  const route = selctedRootName; // Assuming 'selctedRootName' holds the route information
  formData.append("route", route);
  formData.append("line", currentLine);

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


  // const updateCurRoot = useCallback(
  //   (Routename: string) => {
  //     setSelctedRootName(Routename);
  //     setRailWayRoot(railwayRoots[Routename]?.lines);
  //     setIsDropdownOpen(false);

  //     saveRouteData({
  //       selectedRoute: Routename,
  //       selectedLine: currentLine,
  //       department,
  //       name,
  //     }); // Save data when a route is selected
  //   },
  //   [selctedRootName]
  // );

    // Update selected line
    // const updateCurLine = useCallback(
    //   (name: string) => {
    //     if (currentLine === name) {
    //       return;
    //     }
    //     const indexes = railWayLines[name];
    //     const oldIndexes =
    //       railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];
    //     if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
    //       toast("Train is on the line", { type: "error" });
    //       return;
    //     }
    //     setStopPhysics(false);
    //     setCurrentLine(name);
    //     setIsLineDropdownOpen(false);
  
    //     saveRouteData(); // Save data when a line is selected
  
    //     name == "1-line" ||
    //     name == "2-line" ||
    //     name == "4 line" ||
    //     name == "5 line" ||
    //     name == "6 line" ||
    //     name == "7 line" ||
    //     name == "9-line"
    //       ? setIsReverse(true)
    //       : setIsReverse(false);
  
    //     railPaths.forEach((ref, index) => {
    //       const railPath = ref.current;
    //       if (!railPath) return;
    //       if (indexes.includes(index)) {
    //         railPath.enable();
    //       } else {
    //         railPath.disable();
    //       }
    //     });
  
    //     const path = new THREE.CurvePath<THREE.Vector3>();
    //     indexes.forEach((index, i) => {
    //       const railPath = railPaths[index]?.current;
    //       if (!railPath) return;
    //       path.add(railPath.getCurve());
    //     });
  
    //     setPath(path);
    //   },
    //   [currentLine, setCurrentLine, setStopPhysics, setPath, railPaths]
    // );


    const updateCurRoot = useCallback(
      (Routename: string) => {
        const now = new Date().toISOString();
        setStartTime(now); // record start time
    
        setSelctedRootName(Routename);
        setRailWayRoot(railwayRoots[Routename]?.lines);
        setIsDropdownOpen(false);
    
        saveRouteData();
          // name,
          // department,
          // selectedRoute: Routename,
          // selectedLine: currentLine,
          // startTime: now,
          // endTime: "", // not available yet
          // totalTime: "" // not available yet
        // });
      },
      [currentLine, department, name]
    );


    // const updateCurLine = useCallback(
    //   async (Linename: string) => {
    //     if (currentLine === Linename) {
    //       return;
    //     }
    
    //     const indexes = railWayLines[Linename];
    //     const oldIndexes =
    //       railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];
    //     if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
    //       toast("Train is on the line", { type: "error" });
    //       return;
    //     }
    
    //     // Update state
    //     setStopPhysics(false);
    //     setCurrentLine(Linename);
    //     setIsLineDropdownOpen(false);
    
    //     // Call saveRouteData with the new line name
    //     await saveRouteData({
    //       selectedRoute: selctedRootName,
    //       selectedLine: Linename,
    //       department,
    //       name,
    //     });
    
    //     // Update reverse state
    //     name == "1-line" ||
    //     name == "2-line" ||
    //     name == "4 line" ||
    //     name == "5 line" ||
    //     name == "6 line" ||
    //     name == "7 line" ||
    //     name == "9-line"
    //       ? setIsReverse(true)
    //       : setIsReverse(false);
    
    //     // Update rail paths
    //     railPaths.forEach((ref, index) => {
    //       const railPath = ref.current;
    //       if (!railPath) return;
    //       if (indexes.includes(index)) {
    //         railPath.enable();
    //       } else {
    //         railPath.disable();
    //       }
    //     });
    
    //     // Update path
    //     const path = new THREE.CurvePath<THREE.Vector3>();
    //     indexes.forEach((index, i) => {
    //       const railPath = railPaths[index]?.current;
    //       if (!railPath) return;
    //       path.add(railPath.getCurve());
    //     });
    
    //     setPath(path);
    //   },
    //   [currentLine, setCurrentLine, setStopPhysics, setPath, railPaths, selctedRootName, department,name]
    // );

    const updateCurLine = useCallback(
      async (Linename: string) => {
        if (currentLine === Linename) return;
    
        const indexes = railWayLines[Linename];
        const oldIndexes =
          railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];
    
        if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
          toast("Train is on the line", { type: "error" });
          return;
        }
    
        // Update physics and line
        setStopPhysics(false);
        setCurrentLine(Linename);
        setIsLineDropdownOpen(false);
    
        const now = new Date().toISOString();
        setEndTime(now);
    
        // Compute total time (in seconds)
        let duration = "";
        if (startTime) {
          const durationMs = new Date(now).getTime() - new Date(startTime).getTime();
          duration = (durationMs / 1000).toFixed(2) + " seconds";
          setTotalTime(duration);
        }
    
        await saveRouteData();
    
        // Update reverse direction if needed
        const reverseLines = ["1-line", "2-line", "4 line", "5 line", "6 line", "7 line", "9-line"];
        setIsReverse(reverseLines.includes(Linename));
    
        // Update rail path visuals
        railPaths.forEach((ref, index) => {
          const railPath = ref.current;
          if (!railPath) return;
          if (indexes.includes(index)) railPath.enable();
          else railPath.disable();
        });
    
        // Update curve path
        const path = new THREE.CurvePath<THREE.Vector3>();
        indexes.forEach((index) => {
          const railPath = railPaths[index]?.current;
          if (railPath) path.add(railPath.getCurve());
        });
    
        setPath(path);
      },
      [currentLine, railPaths, setStopPhysics, setCurrentLine, selctedRootName, department, name, startTime]
    );
    
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

  // const updateCurRoot = useCallback(
  //   (name: string) => {
  //     setSelctedRootName(name);
  //     setRailWayRoot(railwayRoots[name]?.lines);

  //     setIsDropdownOpen(false);
  //   },
  //   [selctedRootName]
  // );
  // const updateCurLine = useCallback(
  //   (name: string) => {
  //     if (currentLine === name) {
  //       return;
  //     }
  //     const indexes = railWayLines[name];
  //     const oldIndexes =
  //       railWayLines[currentLine]?.filter((i) => !indexes.includes(i)) || [];
  //     if (oldIndexes.some((i) => railPaths[i].current?.isOccupied())) {
  //       toast("Train is on the line", { type: "error" });
  //       return;
  //     }
  //     setStopPhysics(false);
  //     setCurrentLine(name);
  //     setIsLineDropdownOpen(false);


  //     // name == "1 line" ||
  //     // name == "2 line" ||
  //     name == "1-line"||
  //     name == "2-line"||
  //     name == "4 line"||
  //     // name == "3 line"||
  //     name == "5 line"||
  //     name == "6 line"||
  //     name == "7 line"||
  //     name == "9-line"
  //     ?setIsReverse(true)
  //     :setIsReverse(false);
  
  //     railPaths.forEach((ref, index) => {
  //       // console.log("Rail path ",ref,index);

  //       const railPath = ref.current;
  //       if (!railPath) return;
  //       if (indexes.includes(index)) {
  //         railPath.enable();
  //       } else {
  //         railPath.disable();
  //       }
  //     });

  //     const path = new THREE.CurvePath<THREE.Vector3>();
  //     indexes.forEach((index, i) => {
  //       const railPath = railPaths[index]?.current;
  //       // console.log("Rail paths : ",railPath.getCurve());

  //       if (!railPath) return;
  //       path.add(railPath.getCurve());
  //     });

  //     setPath(path);
  //   },
  //   [currentLine, setCurrentLine, setStopPhysics, setPath, railPaths]
  // );
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

