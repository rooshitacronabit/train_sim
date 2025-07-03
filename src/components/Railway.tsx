import * as THREE from "three";
import { createRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

import {
  trackspace,
  RailPathImpl,
  RailPathProps,
  railSegmentLength,
  SignalProps,
  TrackEndProps,
} from "../common";
import { useGlobalContext } from "../Hooks";
import { RailPath } from "./RailPath";
import { Signal } from "./Signal";
import { TrackEnd } from "./TrackEnd";
import { Model as DeadEndModel } from "../models/DeadEndModel";
import { signalsPoints, trackPoints } from "../trackPoints";
import { Model as StationPole } from "../models/electricPole/NewStationPoleModel";
import { Model as PoleNewModel4 } from "../models/electricPole/newelectricBlend2";
import { Model as StationPole1 } from "../models/electricPole/StationPoleModel";


const poleTextColor = "yellow";
export function Railway() {
  const { railPaths, setRailPaths, path } = useGlobalContext();
  const [baseColor, normal, height] = useLoader(THREE.TextureLoader, [
    "./debris/BaseColor.jpg",
    "./terrain/track-texture.png",
    "./debris/Normal.jpg",
    "./debris/Height.png",
  ]);

  const TrackTexture = ({ position, scale, rotation }) => {
    // Load the texture using useLoader
    const texture = useLoader(
      THREE.TextureLoader,
      "./terrain/new-texture-track2.png"
    );
    // const texture = useLoader(THREE.TextureLoader, "./terrain/track-texture.png");

    return (
      <mesh rotation={rotation} position={position} scale={scale}>
        {/* Add geometry (e.g., PlaneGeometry) */}
        <planeGeometry args={[5, 5]} />
        {/* Add material and apply the texture */}
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  };

  
  const trackWidth = 25;

  const paths = useMemo(() => {
    const res: RailPathProps[] = [];

    const addLine = ({
      face = "forward",
      start,
      end,
      jointStart,
      jointEnd,
      joint,
      line,
      curvePath = "normal",
      trackLength = railSegmentLength,
      rotation = 0,
      trackAngle,
      trackRotation = [0, 0, 0],
    }: {
      face?: string;
      start: number;
      end: number;
      jointStart: number;
      jointEnd: number;
      joint: number[];
      line: number;
      curvePath?: string;
      trackLength?: number;
      rotation?: number;
      trackAngle?: string;
      trackRotation?: any;
    }) => {
      if (face === "reverse") {
        for (let i = start; i < end; i++) {
          const sz = i === jointStart ? joint[0] : joint[1];
          const ez = i === jointEnd ? joint[2] : joint[3];
          res.push({
            start: new THREE.Vector3(i * trackLength, 0, sz),
            end: new THREE.Vector3(
              trackAngle && curvePath === "curveLeft"
                ? i * trackLength
                : (i + 1) * trackLength,
              0,
              ez
            ),
            line,
            rotation: sz !== ez ? 90 : 0,
            curvePath,
            trackAngle,
            trackRotation,
          });
        }
      } else {
        for (let i = start; i > end; i--) {
          const sz = i === jointStart ? joint[0] : joint[1];
          const ez = i === jointEnd ? joint[2] : joint[3];
          res.push({
            start: new THREE.Vector3(i * trackLength, 0, sz),
            end: new THREE.Vector3(
              trackAngle && curvePath === "curveLeft"
                ? i * trackLength
                : (i - 1) * trackLength,
              0,
              ez
            ),
            line,
            rotation: sz !== ez ? 90 : 0,
            curvePath,
            trackAngle,
            trackRotation,
          });
        }
      }
    };

    trackPoints.forEach((config) => addLine(config));

    const refs = res.map((props, ix) => {
      props.index = ix;
      return createRef<RailPathImpl>();
    });

    setRailPaths?.(refs);
    return res;
  }, [setRailPaths]);

  const signals = useMemo(() => {
    // const res: SignalProps[] = [];
    const res = [];
    signalsPoints.map((signal) => {
      res.push({
        position: new THREE.Vector3(signal.x, signal.y, signal.z),
        facing: signal.facing,
        label: signal.label,
        type: signal.type,
        rotation: signal.rotation,
      });
    });

    return res;
  }, []);

  const trackEnds = useMemo(() => {
    const res: TrackEndProps[] = [];
    res.push({ facing: "reverse" });
    res.push({ facing: "forward" });
    return res;
  }, []);

  const deadEndPosition = useMemo(() => {
    return [
      {
        position: new THREE.Vector3(2, -0.1, -12),
        rotation: new THREE.Euler(),
      },
      {
        position: new THREE.Vector3(-152, -0.1, 27),
        rotation: new THREE.Euler(0, -Math.PI, 0),
      },
    ];
  }, []);

  const electricPoleStation = useMemo(() => {
    return [
      
      new THREE.Vector3(-15, 0, -13.5),
      new THREE.Vector3(-60, 0, -13.5),
      new THREE.Vector3(-45, 0, -13.5),
      new THREE.Vector3(-30, 0, -13.5),
      new THREE.Vector3(-75, 0, 1.5),   
      new THREE.Vector3(-60, 0, 1.5),     
      new THREE.Vector3(-45, 0, 1.5),
      new THREE.Vector3(-30, 0, 1.5),
      new THREE.Vector3(-15, 0, 1.5),
      new THREE.Vector3(0, 0, 1.5),
      new THREE.Vector3(15, 0, 1.5),
      new THREE.Vector3(30, 0, 1.5),
      new THREE.Vector3(45, 0, 1.5),

    ];
  }, []);

  const electricPoleStation1 = useMemo(() => {
    return [
      new THREE.Vector3(-45, 0, -16),
      new THREE.Vector3(-30, 0, -16),
      new THREE.Vector3(-15, 0, -16),
      new THREE.Vector3(0, 0, -16),
      new THREE.Vector3(15, 0, -16),
      new THREE.Vector3(30, 0, -16),
      new THREE.Vector3(-45, 0, -24.5),
      new THREE.Vector3(-30, 0, -24.5),
      new THREE.Vector3(-15, 0, -24.5),
      new THREE.Vector3(0, 0, -24.5),
      new THREE.Vector3(15, 0, -24.5),
      new THREE.Vector3(30, 0, -24.5),
    ];
  }, []);

  const electricPoleYard = useMemo(() => {
    return [
      new THREE.Vector3(340, 0, 0.3),
      new THREE.Vector3(360, 0, 0.3),
      new THREE.Vector3(380, 0, 0.3),
      new THREE.Vector3(400, 0, 0.3),
      new THREE.Vector3(420, 0, 0.3),
      new THREE.Vector3(440, 0, 0.3),
      new THREE.Vector3(460, 0, 0.3),
      new THREE.Vector3(480, 0, 0.3),
    ];
  }, []);

  return (
    <RigidBody colliders={false} type="fixed">
      {/* Render Rail Paths */}
      {paths.map((props, i) => {
        return(
        <RailPath 
          {...props}
              key={i}
              ref={railPaths ? railPaths[i] : null}
              baseColor={baseColor}
              normal={normal}
              height={height}/>
            );
        })}

      {/* Render Signals */}
      {signals.map((signal, index) => (
        <group key={index}>
          {/* Render Signal */}
          <Signal {...signal} />
        </group>
      ))}

      {/* Render Track Ends */}
      {trackEnds.map((props, i) => {
        return <TrackEnd {...props} key={i} />;
      })}

      {/* Render Dead Ends */}
      {deadEndPosition.map((pos, i) => {
        return (
          <DeadEndModel
            key={i}
            scale={0.04}
            position={pos.position}
            rotation={pos.rotation}
          ></DeadEndModel>
        );
      })}

      {/* Render Electric Poles at Stations */}
      {electricPoleStation.map((pos, i) => (
        <StationPole
          key={`station-pole-${i}`}
          scale={[0.3, 0.25, 0.28]}
          position={pos}
        />
      ))}

      {/* Render Electric Poles (second set) */}
      {electricPoleStation1.map((pos, i) => (
        <StationPole1
          key={`station-pole1-${i}`}
          scale={[0.3, 0.25, 0.2]}
          position={[pos.x, pos.y, pos.z + 30]}
        />
      ))}

      {/* Render Yard Poles */}
      {electricPoleYard.map((pos, i) => (
        <StationPole
          key={`yard-pole-${i}`}
          scale={[0.3, 0.25, 0.4]}
          position={pos}
        />
      ))}
    </RigidBody>
  );
}
