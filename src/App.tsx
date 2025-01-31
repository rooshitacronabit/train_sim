import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ToastContainer } from "react-toastify";
import CameraControlsImpl from "camera-controls";

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
import { Ui } from "./components/Ui";
import { useLocalState } from "./Hooks";
import FadeLoader from "react-spinners/FadeLoader";

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
      <ToastContainer
        position="top-center"
        newestOnTop={true}
        autoClose={2500}
      />
      {/* Loader */}
      {/* {!isSceneLoaded && (
        <div className="initailScreen">
          <div className="image-container">
           <div className="initailScreen_top"> <img src="./logo/railway_logo.png" alt="logo" />
            <div className="overlay-text">
            Sunredranagar Yard <br /> 3D Virtual  <span>Tour for LRD</span>
            </div></div>
            <div className="loader">
         <FadeLoader color="red" />
         </div>
          </div>         
        </div>
      )} */}
      {/* Main Content */}
      <Canvas>
        <Scene onLoaded={() => setIsSceneLoaded(true)} />
      </Canvas>
      <Ui></Ui>
    </GlobalContext.Provider>
  );
}
