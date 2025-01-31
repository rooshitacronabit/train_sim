import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { CameraControls, Detailed, Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import {
  Bloom,
  SelectiveBloom,
  EffectComposer,
  Noise,
  Vignette,
  LensFlare,
} from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { BlendFunction } from "postprocessing";

import { railSegmentLength, trackspace } from "../common";
import { useGlobalContext, useToggledComponent } from "../Hooks";
import { Station } from "./buildings/Station.tsx";
import { Railway } from "./Railway";
import { Train } from "./Train";
import { Camera } from "./Camera";
import { Terrain } from "./landscape/Terrain";
import { Water } from "./landscape/Water";

const terrainSize = 1500;
const trainHeight = 0.7;

interface SceneProps {
  onLoaded: () => void;
}

export const Scene: React.FC<SceneProps> = ({ onLoaded }) => {
  useEffect(() => {
    // Simulate scene loading delay
    const timer = setTimeout(() => {
      onLoaded(); // Notify App that Scene is loaded
    }, 2000); // Mock 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onLoaded]);


  const { cameraControls, isDebug, isReverse, currentLine } = useGlobalContext();

  const trainPosition = useMemo(() => {
    // return new THREE.Vector3(railSegmentLength * 0, trainHeight, 0);

    return new THREE.Vector3(
      railSegmentLength * 0,
      trainHeight,
      trackspace - 5
    ); //33
  }, [trainHeight, isReverse, currentLine]);

  const cameraTarget = useRef<THREE.Object3D>();

  return (
    <>
      {/* <gridHelper args={[2000, 100]} /> */}
      <Environment
        files="./hdr/industrial_sunset_puresky_1k.hdr"
        environmentIntensity={0}
        background
      />

      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 7, 20]} intensity={4} color="white" />
      <object3D ref={cameraTarget} />

      <Camera index={0} position={[0, 6, 0]} targetRef={cameraTarget} />

      <CameraControls
        ref={cameraControls}
        minDistance={0.1}
        maxDistance={150}
        // minPolarAngle={Math.PI * 0.2}
        // maxPolarAngle={Math.PI * 0.45}
        // minAzimuthAngle={-Math.PI * 0.45}
        // maxAzimuthAngle={Math.PI * 0.45}
        minZoom={0.2}
        maxZoom={0.3}
        restThreshold={0.15}
      ></CameraControls>

      {/* <Terrain
        elevation="./terrain/height_create1.jpg"
        diffuse="./terrain/terrin_ground.jpg"
        size={1800}
        resolution={2048}
        height={79.5}
        position={[50, -17.3, 50]}
      /> */}

      {/* <Water
        position={[100, -16, 90]}
        rotation={[0, 0, 0]}
        width={terrainSize}
        length={150}
      /> */}

      {/* <Station
        position={[0, 0, 4]}
        scale={[40, 80, 40]}
        rotation={[0, Math.PI, 0]}
      ></Station> */}

      <Physics debug={isDebug} timeStep="vary" updateLoop="follow">
        <Railway />
        <Train position={trainPosition} />
      </Physics>

      {isDebug && <Perf position="top-right" />}
      <EffectComposer>
        <Noise opacity={0.25} blendFunction={BlendFunction.SKIP}></Noise>
        <Bloom
          mipmapBlur
          luminanceThreshold={1.5}
          luminanceSmoothing={1.5}
          height={500}
        ></Bloom>
        <Vignette eskil={false} offset={0.02} darkness={0.1}></Vignette>
      </EffectComposer>
    </>
  );
};
