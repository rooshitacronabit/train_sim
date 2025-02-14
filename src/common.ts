import * as THREE from "three";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import { Vector3 } from "@react-three/fiber";
import { RigidBodyProps } from "@react-three/rapier";
import { Triplet } from "@react-three/cannon";
import CameraControlsImpl from "camera-controls";

// --- Types ---

export type TrainDirection = "forward" | "reverse";

export type TrainState = TrainDirection | "stop" | "stop-signal";
// | "forward-signal"
// | "reverse-signal";

export interface CameraProps {
  index: number;
  fixed?: boolean;
  distance?: number;
  position?: Vector3;
  targetRef?: RefObject<THREE.Object3D>;
}

export interface TrackEndProps {
  position?: THREE.Vector3;
  facing?: TrainDirection;
  trackEndsPoints?: object;
}

export interface SignalBulbProps {
  position: THREE.Vector3;
  color: string;
  on?: boolean;
}

export interface SignalProps {
  position: THREE.Vector3;
  rotation?: [number, number, number];
  facing?: TrainDirection;
  label?: string;
  type?:
    | "starter"
    | "main-starter"
    | "home"
    | "signal-main"
    | "signal-main-lunar"
    | "signal-main-lunar-left"
    | "signal-main-lunar-right"
    | "signal-main-analog"
    | "signal-starter"
    | "signal-starter-lunar"
    | "signal-starter-lunar-right"
    | "signal-starter-lunar-left"
    | "signal-four-light"
    | "signal-main-lunar-right-two-model"
    | "signal-home-four-light-lunar-model"
    | "signal-home-four-light-lunar-right-model"
    | "signal-main-lunar-right-three"
    | "signal-digital";
}

export interface TrainProps extends RigidBodyProps {
  position: THREE.Vector3;
}

export interface RailPathProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  rotation?: number;
  line?: number;
  trainSpeed?: number;
  index?: number;
  baseColor?: THREE.Texture;
  normal?: THREE.Texture;
  height?: THREE.Texture;
  curvePath: string;
  trackAngle?: string;
  trackRotation?: any;
}

export interface RailPathImpl {
  enable: () => void;
  disable: () => void;
  isOccupied: () => boolean;
  getCurve: () => THREE.Curve<THREE.Vector3>;
}

export type Setter<T> = Dispatch<SetStateAction<T>>;

export interface AppCamera {
  index: number;
  fixed: boolean;
  ref: RefObject<THREE.Group>;
}

export type RailPathRef = RefObject<RailPathImpl>;

export type TrainPath = THREE.CurvePath<THREE.Vector3>;

export interface GlobalContextProps {
  // --- References ---
  currentSpeed?: MutableRefObject<number>;
  cameraControls?: MutableRefObject<CameraControlsImpl>;
  cameras?: AppCamera[];
  setCameras?: Setter<AppCamera[]>;
  railPaths?: RailPathRef[];
  setRailPaths?: Setter<RailPathRef[]>;
  // --- State ---
  isDebug?: boolean;
  setDebug?: Setter<boolean>;
  camera?: number;
  setCamera?: Setter<number>;
  trackEnd?: TrainDirection;
  setTrackEnd?: Setter<TrainDirection>;
  stopPhysics?: boolean;
  setStopPhysics?: Setter<boolean>;
  maxSpeed?: number;
  setMaxSpeed?: Setter<number>;
  state?: TrainState;
  setState?: Setter<TrainState>;
  path?: TrainPath;
  setPath?: Setter<TrainPath>;
  currentLine?: string;
  setCurrentLine?: Setter<string>;
  isReverse?: boolean;
  setIsReverse?: Setter<boolean>;
  popUpVisible?: boolean;
  setPopUpVisible?: Setter<boolean>;
  popUpContent?: any;
  setPopUpContent?: Setter<object>;
  trainInitialPostion?: any;
  setTrainInitialPostion?: Setter<any>;
  isEngineAudioPlaying?: boolean;
  setIsEngineAudioPlaying?: Setter<boolean>;
}

// --- Constants ---
export const railSize = 0.015;
export const trackspace = 3;
export const railSegmentLength = 30;

// train route with track
// NAMING : <mainLine_name>.<its_subline_name>
const trainHeight = 0.7;
export const railwayRoots = {
  "RJT-BKNG": {
    lines: ["1-line", "2-line"],
  },
  "BKNG-RJT": {
    lines: ["1 line", "2 line"],
  },
  "BLWR-BKNG": {
    lines: ["3 line", "4 line"],
  },
  "RJT-KHDI" : {
    lines : ["1_line", "2_line"],
  },
  "KHDI-RJT" : {
    lines : ["1--line", "2--line"],
  },
  "BLWR-KHDI": {
    lines: ["4-line", "3-line"],
  },
  "BKNG-BLWR": {
    lines: ["5 line", "6 line", "7 line"],
  },
  "KHDI-BLWR": {
    lines: ["5-line", "6-line", "7-line"],
  },
};
export const railWayLines = {
  // VRL
  "1 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 5, 0, 1, 2, 3,
    4,
  ],
  "2 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 5, 6, 7, 8, 9,
    10,
  ],
  "1-line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 5, 0, 1, 2, 3,
    4,
  ],
  "2-line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 5, 6, 7, 8, 9,
    10,
  ],
 
  "3 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  ],
  "4 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 153, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  ],
  "5 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 153, 59, 85, 155,
    81, 82, 83, 84, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138,
  ],
  "6 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 153, 59, 85, 86, 87,
    88, 89, 90, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137,
    138,
  ],
  "7 line": [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 153, 154, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
    136, 137, 138,
  ],
  // Happa
  "1_line": [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58,160,5, 0, 1, 2, 3,
    4,
  ],
  "2_line": [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58,160, 5, 6, 7, 8, 9,
    10,
  ],
  "1--line": [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115,158,58,160,5, 0, 1, 2, 3,
    4,
  ],
  "2--line": [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115,158,58,160, 5, 6, 7, 8, 9,
    10,
  ],
  "3-line": [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 151, 28, 29, 30, 31, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  ],
  "4-line": [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  ],
  "5-line": [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 156, 155, 81, 82, 83,
    84, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
  ],
  "6-line": [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 156, 86, 87, 88, 89,
    90, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
  ],
  "7-line": [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
    123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137,
    138,
  ],
} as Record<string, number[]>;

// for Signal lunar light
export const railWayLunar = {
  "1_line": [1, 2, 3, 4, 5],  // Added for RJT-KHDI
  "2_line": [1, 2, 3, 4, 5],  // Added for RJT-KHDI
  "1 line": [1, 2, 3, 4, 5],
  "2 line": [1, 2, 3, 4, 5],
  "1--line": [1, 6, 7, 8, 9],
  "2--line": [1, 6, 7, 8, 9],
  "3 line": [1, 2, 3, 4, 5],
  "4 line": [1,2,3,4,5],
  "3-line": [1, 2, 3, 4, 5],
  "4-line": [],
  "5 line": [1, 6, 7, 8, 9],
  "6 line": [1, 6, 7, 8, 9],
  "7 line": [1, 6, 7, 8, 9],
  "5-line": [1, 6, 7, 8, 9],
  "6-line": [1, 6, 7, 8, 9],
  "7-line": [],
} as Record<string, number[]>;

export const railWayLineNames = Object.keys(railWayLines);

export const trainMaxSpeed = 70;


export const trackSize = 0.25;

export const trackDetectorSize = 1.5;

export const trackDetectorArgs = [
  trackDetectorSize,
  trackDetectorSize,
  trackDetectorSize,
] as Triplet;

export const trackDebrisSize = 0.9;

export const trackDebrisDepth = 0.5;

export const trackDepth = 0.025;

export const wheelThickness = 0.1;

export const wheelRadius = wheelThickness + 0.2;

export const wheelFullWidth = trackSize + 0.2;

export const trainStates = ["forward", "reverse", "stop"] as TrainState[];

export const GlobalContext = createContext<GlobalContextProps>({});

export class CustomCurve extends THREE.Curve<THREE.Vector3> {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  getPoint(t: number): THREE.Vector3 {
    const angle = t * (35 * (Math.PI / 180)); // Convert 35 degrees to radians
    return new THREE.Vector3(
      Math.cos(angle) * this.radius, // X-coordinate
      0, // Y-coordinate (flat curve)
      Math.sin(angle) * this.radius // Z-coordinate
    );
  }
}

// --- Functions ---

const center = new THREE.Vector2(0, 0);

function transform<T extends number[]>(m: THREE.Matrix3, ...points: T): T {
  const result = [] as T;
  for (let ix = 0; ix < points.length; ix += 2) {
    const pt = new THREE.Vector2(points[ix], points[ix + 1]);
    pt.applyMatrix3(m);
    result.push(...pt.toArray());
  }
  return result;
}

export function getRailShape(size: number, rotation?: number): THREE.Shape {
  const angle = ((rotation ?? 0) * Math.PI) / 180;
  const res = new THREE.Shape();
  const m = new THREE.Matrix3();
  m.scale(0.01, 0.01);
  m.translate(size, 0);
  m.rotate(angle);

  res.moveTo(...transform(m, -0.5, -7));
  res.lineTo(...transform(m, 0.5, -7));
  res.lineTo(...transform(m, 0.5, -7));
  res.bezierCurveTo(...transform(m, 1.5, -7, 2.5, -6, 0.5, -5));
  res.lineTo(...transform(m, 0.5, -4));
  res.quadraticCurveTo(...transform(m, 0.5, -4, 0.5, -3));
  res.quadraticCurveTo(...transform(m, 0.5, -2, 1.5, -1));
  res.quadraticCurveTo(...transform(m, 2.5, 0, 1, 0));
  res.lineTo(...transform(m, -1, 0));
  res.quadraticCurveTo(...transform(m, -2.5, 0, -1.5, -1));
  res.quadraticCurveTo(...transform(m, -0.5, -2, -0.5, -3));
  res.lineTo(...transform(m, -0.5, -4));
  res.lineTo(...transform(m, -0.5, -5));
  res.bezierCurveTo(...transform(m, -2.5, -6, -1.5, -7, -0.5, -7));

  return res;
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.round(random(min, max));
}

export function round(value: number, to: number): number {
  return Math.round(value / to) * to;
}
