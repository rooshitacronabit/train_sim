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
  "RJT-VRL": {
    lines: ["1 line"],
  },
 
};
export const railWayLines = {
  // VRL
  "1 line": [
   1,2,3,4,5,35,36,37,38,39,40,129,156,140,141,142,160,161
  ],
 
} as Record<string, number[]>;

// for Signal lunar light
export const railWayLunar = {
  "1 line": [1, 2, 3, 4, 5],
 
} as Record<string, number[]>;

export const railWayLineNames = Object.keys(railWayLines);

export const trainMaxSpeed = 70;

export const trainMaxCurveSpeed = 15;

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
