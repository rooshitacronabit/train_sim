import * as THREE from "three";
import { createRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { CatmullRomLine, Detailed } from "@react-three/drei";
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
import {
  signalsPoints,
  trackPoints,
} from "../trackPoints";

export function Railway() {
  const { railPaths, setRailPaths, path } = useGlobalContext();
  const [baseColor, normal, height] = useLoader(THREE.TextureLoader, [
    "./debris/BaseColor.jpg",
    "./terrain/track-texture.png",
    "./debris/Normal.jpg",
    "./debris/Height.png",
  ]);

  const paths = useMemo(() => {
    const res: RailPathProps[] = [];

    // Encapsulated reusable addLine function
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
      if (face == "reverse") {
        for (let i = start; i < end; i++) {
          const sz = i === jointStart ? joint[0] : joint[1];
          const ez = i === jointEnd ? joint[2] : joint[3];
          res.push({
            start: new THREE.Vector3(i * trackLength, 0, sz),
            end: new THREE.Vector3(
              trackAngle != undefined && curvePath == "curveLeft"
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
              trackAngle == "curve1" || trackAngle == "curve2" || trackAngle == "curve4"|| trackAngle == "curve5" ? (i - 2) * trackLength
                : trackAngle == "curve3" ? (i - 2.5) * trackLength 
                : curvePath == "straight1" ? (i) * trackLength 
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

    // Generate paths based on configurations
    trackPoints.forEach((config) => addLine(config));

    // Add refs for each path
    const refs = res.map((props, ix) => {
      // console.log("Track couunt : ",res.length,ix,props);
      props.index = ix;
      return createRef<RailPathImpl>();
    });

    setRailPaths?.(refs);
    return res;
  }, [setRailPaths, railSegmentLength, trackspace]);

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
    res.push({
      // position: new THREE.Vector3(5.75 * railSegmentLength, 0, 0),
      facing: "reverse",
    });
    res.push({
      // position: new THREE.Vector3(-5.75 * railSegmentLength, 0, 0),
      facing: "forward",
    });
    return res;
  }, []);

  const deadEndPotion = useMemo(() => {
    return [
      {
        position: new THREE.Vector3(0, -0.1, -5.5),
        rotation: new THREE.Euler(),
      },
    ];
  }, []);

  return (
    <RigidBody colliders={false} type="fixed">
      {paths.map((props, i) => {
        return (
          <RailPath
            {...props}
            key={i}
            ref={railPaths ? railPaths[i] : null}
            baseColor={baseColor}
            normal={normal}
            height={height}
          />
        );
      })}

      {signals.map((signal, index) => (
        <group key={index}>
          {/* Render Signal */}
          <Signal {...signal} />
        </group>
      ))}
      {trackEnds.map((props, i) => {
        return <TrackEnd {...props} key={i} />;
      })}
      {deadEndPotion.map((pos, i) => {
        return (
          <DeadEndModel
            key={i}
            scale={0.04}
            position={pos.position}
            rotation={pos.rotation}
          ></DeadEndModel>
        );
      })}
    </RigidBody>
  );
}
