// // import { useRef, useState } from "react";
// // import { Canvas } from "@react-three/fiber";
// // import { ToastContainer } from "react-toastify";
// // import CameraControlsImpl from "camera-controls";

// // import {
// //   AppCamera,
// //   GlobalContext,
// //   RailPathRef,
// //   TrainDirection,
// //   trainMaxSpeed,
// //   TrainPath,
// //   TrainState,
// // } from "./common";
// // import { Scene } from "./components/Scene";
// // import { Ui } from "./components/Ui";
// // import { useLocalState } from "./Hooks";
// // import FadeLoader from "react-spinners/FadeLoader";

// // export default function App() {
// //   // --- References ---
// //   const currentSpeed = useRef(0);
// //   const cameraControls = useRef<CameraControlsImpl>();
// //   const [cameras, setCameras] = useState<AppCamera[]>([]);
// //   const [railPaths, setRailPaths] = useState<RailPathRef[]>([]);

// //   // --- State ---
// //   const [isDebug, setDebug] = useLocalState(false, "isDebug");
// //   const [camera, setCamera] = useState(0);
// //   const [trackEnd, setTrackEnd] = useState<TrainDirection>(null);
// //   const [stopPhysics, setStopPhysics] = useState(true);
// //   const [maxSpeed, setMaxSpeed] = useState(trainMaxSpeed);
// //   const [state, setState] = useState<TrainState>("stop");
// //   const [path, setPath] = useState<TrainPath>(null);
// //   const [currentLine, setCurrentLine] = useState<string>("");
// //   const [isReverse, setIsReverse] = useState<boolean>(false);
// //   const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
// //   const [popUpContent, setPopUpContent] = useState();
// //   const [isEngineAudioPlaying, setIsEngineAudioPlaying] = useState(false);
// //   const [trainInitialPostion, setTrainInitialPostion] = useState({
// //     x: 0,
// //     y: -5,
// //     z: 0,
// //   });

// //   // Loader State
// //   const [isSceneLoaded, setIsSceneLoaded] = useState(false);

// //   return (
// //     <GlobalContext.Provider
// //       value={{
// //         currentSpeed,
// //         cameraControls,
// //         cameras,
// //         setCameras,
// //         railPaths,
// //         setRailPaths,

// //         isDebug,
// //         setDebug,
// //         camera,
// //         setCamera,
// //         trackEnd,
// //         setTrackEnd,
// //         stopPhysics,
// //         setStopPhysics,
// //         maxSpeed,
// //         setMaxSpeed,
// //         state,
// //         setState,
// //         path,
// //         setPath,
// //         currentLine,
// //         setCurrentLine,
// //         isReverse,
// //         setIsReverse,
// //         popUpVisible,
// //         setPopUpVisible,
// //         popUpContent,
// //         setPopUpContent,
// //         trainInitialPostion,
// //         setTrainInitialPostion,
// //         isEngineAudioPlaying,
// //         setIsEngineAudioPlaying,
// //       }}
// //     >
// //       <ToastContainer
// //         position="top-center"
// //         newestOnTop={true}
// //         autoClose={2500}
// //       />
// //       {/* Loader */}
// //       {/* {!isSceneLoaded && (
// //         <div className="initailScreen">
// //           <div className="image-container">
// //            <div className="initailScreen_top"> <img src="./logo/railway_logo.png" alt="logo" />
// //             <div className="overlay-text">
// //             Sunredranagar Yard <br /> 3D Virtual  <span>Tour for LRD</span>
// //             </div></div>
// //             <div className="loader">
// //          <FadeLoader color="red" />
// //          </div>
// //           </div>         
// //         </div>
// //       )} */}
// //       {/* Main Content */}
// //       <Canvas>
// //         <Scene onLoaded={() => setIsSceneLoaded(true)} />
// //       </Canvas>
// //       <Ui></Ui>
// //     </GlobalContext.Provider>
// //   );
// // }


// import { useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { ToastContainer } from "react-toastify";
// import CameraControlsImpl from "camera-controls";
// import FadeLoader from "react-spinners/FadeLoader";
// import {
//   AppCamera,
//   GlobalContext,
//   RailPathRef,
//   TrainDirection,
//   trainMaxSpeed,
//   TrainPath,
//   TrainState,
// } from "./common";
// import { Scene } from "./components/Scene";
// import { Ui } from "./components/Ui";
// import { useLocalState } from "./Hooks";

// export default function App() {
//   // --- References ---
//   const currentSpeed = useRef(0);
//   const cameraControls = useRef<CameraControlsImpl>();
//   const [cameras, setCameras] = useState<AppCamera[]>([]);
//   const [railPaths, setRailPaths] = useState<RailPathRef[]>([]);

//   // --- State ---
//   const [isDebug, setDebug] = useLocalState(false, "isDebug");
//   const [camera, setCamera] = useState(0);
//   const [trackEnd, setTrackEnd] = useState<TrainDirection>(null);
//   const [stopPhysics, setStopPhysics] = useState(true);
//   const [maxSpeed, setMaxSpeed] = useState(trainMaxSpeed);
//   const [state, setState] = useState<TrainState>("stop");
//   const [path, setPath] = useState<TrainPath>(null);
//   const [currentLine, setCurrentLine] = useState<string>("");
//   const [isReverse, setIsReverse] = useState<boolean>(false);
//   const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
//   const [popUpContent, setPopUpContent] = useState();
//   const [isEngineAudioPlaying, setIsEngineAudioPlaying] = useState(false);
//   const [trainInitialPostion, setTrainInitialPostion] = useState({
//     x: 0,
//     y: -5,
//     z: 0,
//   });

//   // Loader State
//   const [isSceneLoaded, setIsSceneLoaded] = useState(false);

//   // --- User Info State ---
//   const [userSubmitted, setUserSubmitted] = useState(false);
//   const [name, setName] = useState("");
//   const [department, setDepartment] = useState("");

//   // Handle form submission
//   const handleUserSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("user_name", name);
//     formData.append("department", department);

//     try {
//       const res = await fetch("http://localhost/train_sim_sunr/server/start.php", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         const responseData = await res.json();

//         if (responseData.message === "Data received successfully") {
//           localStorage.setItem("name", name);
//           setUserSubmitted(true);
//           console.log("User submitted");
//         } else {
//           alert("Error: " + responseData.message);
//         }
//       } else {
//         alert("Failed to submit form");
//       }
//     } catch (err) {
//       console.error("Error submitting form", err);
//     }
//   };

//   // Show form before anything else
//   if (!userSubmitted) {
//     return (
//       <div className="initailScreen">
//           <div className="image-container">
//             <div className="initailScreen_top">
//             <img src="./logo/railway_logo.png" alt="logo" />
//               <div className="user-form">
//               <div className="overlay-text1">
//                 <h2>Enter Your Details</h2>
//                 <form onSubmit={handleUserSubmit}>
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Department"
//                     required
//                     value={department}
//                     onChange={(e) => setDepartment(e.target.value)}
//                   />
//                   <button type="submit">Start Simulation</button>
//                 </form>
//                 </div>
//               </div>
//            </div>
//         </div>
//       </div>
//     );
//   }

//   // Show simulation and loader after form submission
//   return (
//     <GlobalContext.Provider
//       value={{
//         currentSpeed,
//         cameraControls,
//         cameras,
//         setCameras,
//         railPaths,
//         setRailPaths,
//         isDebug,
//         setDebug,
//         camera,
//         setCamera,
//         trackEnd,
//         setTrackEnd,
//         stopPhysics,
//         setStopPhysics,
//         maxSpeed,
//         setMaxSpeed,
//         state,
//         setState,
//         path,
//         setPath,
//         currentLine,
//         setCurrentLine,
//         isReverse,
//         setIsReverse,
//         popUpVisible,
//         setPopUpVisible,
//         popUpContent,
//         setPopUpContent,
//         trainInitialPostion,
//         setTrainInitialPostion,
//         isEngineAudioPlaying,
//         setIsEngineAudioPlaying,
//       }}
//     >
//       <ToastContainer position="top-center" newestOnTop={true} autoClose={2500} />

//       {/* Loader screen */}
//       {!isSceneLoaded && (
//         <div className="initailScreen">
//           <div className="image-container">
//             <div className="initailScreen_top">
//               <img src="./logo/railway_logo.png" alt="logo" />
//               <div className="overlay-text">
//                 Sunredranagar Yard <br /> 3D Virtual <span>Tour for LRD</span>
//               </div>
//             </div>
//             <div className="loader">
//               <FadeLoader color="red" />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 3D Scene Canvas */}
//       <Canvas>
//         <Scene onLoaded={() => setIsSceneLoaded(true)} />
//       </Canvas>

//       {/* UI */}
//       <Ui />
//     </GlobalContext.Provider>
//   );
// }


import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ToastContainer } from "react-toastify";
import CameraControlsImpl from "camera-controls";
import FadeLoader from "react-spinners/FadeLoader";

import {
  AppCamera,
  GlobalContext,
  RailPathRef,
  TrainDirection,
  trainMaxSpeed,
  TrainPath,
  TrainState,
} from "./common";
import { Scene } from "./components/Scene";
import {Ui} from "./components/Ui";
import { useLocalState } from "./Hooks";


export default function App() {
  // --- References ---
  const currentSpeed = useRef(0);
  const cameraControls = useRef<CameraControlsImpl>();
  const [cameras, setCameras] = useState<AppCamera[]>([]);
  const [railPaths, setRailPaths] = useState<RailPathRef[]>([]);

  // --- State ---
  const [isDebug, setDebug] = useLocalState(false, "isDebug");
  const [camera, setCamera] = useState(0);
  const [trackEnd, setTrackEnd] = useState<TrainDirection>(null);
  const [stopPhysics, setStopPhysics] = useState(true);
  const [maxSpeed, setMaxSpeed] = useState(trainMaxSpeed);
  const [state, setState] = useState<TrainState>("stop");
  const [path, setPath] = useState<TrainPath>(null);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState();
  const [isEngineAudioPlaying, setIsEngineAudioPlaying] = useState(false);
  const [trainInitialPostion, setTrainInitialPostion] = useState({
    x: 0,
    y: -5,
    z: 0,
  });

  // Loader State
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  // User Info State
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  // Handle form submission
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_name", name);
    formData.append("department", department);

    try {
      const res = await fetch("http://localhost/train_sim_sunr/server/start.php", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const responseData = await res.json();

        if (responseData.message === "Data received successfully") {
          console.log("Data received successfully");
          console.log(name, department);
          localStorage.setItem("name", name);
          setUserSubmitted(true);
        } else {
          alert("Error: " + responseData.message);
        }
      } else {
        alert("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // const handleUserSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   // Validate the form inputs
  //   if (!name || !department) {
  //     alert("Please fill in both Name and Department.");
  //     return;
  //   }
  
  //   // Directly update the state without sending data to the backend
  //   setUserSubmitted(true);
  //   console.log("User submitted:", { name, department });
  // };

  // Show form first
  if (!userSubmitted) {
    return (
      <div className="initailScreen">
        <div className="image-container">
          <div className="initailScreen_top">
            <img src="./logo/railway_logo.png" alt="logo" />
            <div className="user-form">
              <div className="overlay-text1">
                <h2>Enter Your Details</h2>
                <form onSubmit={handleUserSubmit}> 
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <button type="submit" >Start Simulation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // After user submits, show simulation
  return (
    <GlobalContext.Provider
      value={{
        currentSpeed,
        cameraControls,
        cameras,
        setCameras,
        railPaths,
        setRailPaths,
        isDebug,
        setDebug,
        camera,
        setCamera,
        trackEnd,
        setTrackEnd,
        stopPhysics,
        setStopPhysics,
        maxSpeed,
        setMaxSpeed,
        state,
        setState,
        path,
        setPath,
        currentLine,
        setCurrentLine,
        isReverse,
        setIsReverse,
        popUpVisible,
        setPopUpVisible,
        popUpContent,
        setPopUpContent,
        trainInitialPostion,
        setTrainInitialPostion,
        isEngineAudioPlaying,
        setIsEngineAudioPlaying,
      }}
    >
      <ToastContainer position="top-center" newestOnTop={true} autoClose={2500} />

      {!isSceneLoaded && (
        <div className="initailScreen">
          <div className="image-container">
            <div className="initailScreen_top">
              <img src="./logo/railway_logo.png" alt="logo" />
              <div className="overlay-text">
                Sunredranagar Yard <br />
                3D Virtual <span>Tour for LRD</span>
              </div>
            </div>
            <div className="loader">
              <FadeLoader color="red" />
            </div>
          </div>
        </div>
      )}

      <Canvas>
        <Scene onLoaded={() => setIsSceneLoaded(true)} />
      </Canvas>
      <Ui name={name} department={department} />
      
    </GlobalContext.Provider>
  );
}
