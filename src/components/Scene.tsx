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
import TreesCollection from "./TreesCollection";



const terrainSize = 1500;
const trainHeight = 0.7;

interface SceneProps {
  onLoaded: () => void;
}

export const Scene: React.FC<SceneProps> = ({ onLoaded }) => {
  useEffect(() => {
    // Simulate scene loading delay

    if (cameraControls.current) {
      // cameraControls.current.setTarget(30, 10, 10);
      // cameraControls.current.zoomTo(20, true);
    }
    const timer = setTimeout(() => {
      onLoaded(); // Notify App that Scene is loaded
    }, 2000); // Mock 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onLoaded]);


  const { cameraControls, isDebug, isReverse, currentLine } = useGlobalContext();

  const trainPosition = useMemo(() => {
    if (currentLine == "1 line"||currentLine=="2 line" ) {
      return new THREE.Vector3(
        railSegmentLength * 12,
        trainHeight,
        trackspace 
      );
    }
    if (currentLine == "1-line" || currentLine == "2-line" || currentLine == "5-line") {
      return new THREE.Vector3(
        railSegmentLength * 0,
        trainHeight,
        trackspace -3
      );
    }


    if (
      currentLine == "5 line"||currentLine=="9-line"||currentLine=="10-line"
    ) {
      return new THREE.Vector3(railSegmentLength * -29, trainHeight, trackspace );
    }

    if(currentLine == "6 line")
    {
      return new THREE.Vector3(railSegmentLength * -29, trainHeight, trackspace +3);
    }

    if(currentLine == "6-line")
    {
      return new THREE.Vector3(railSegmentLength * 0, trainHeight, trackspace +3);
    }

    if(currentLine == "7-line")
      {
        return new THREE.Vector3(railSegmentLength * 0, trainHeight, trackspace +12);
      }

      if(currentLine == "7 line")
        {
          return new THREE.Vector3(railSegmentLength * -18, trainHeight, trackspace +24);
        }


    // if (
    //   currentLine == "3-line" ||
    //   currentLine == "4-line"
    // ) {
    //   return new THREE.Vector3(railSegmentLength * -0.5, trainHeight, trackspace-15);
    // }


    if (
      currentLine == "3 line" ||
      currentLine == "4 line" || currentLine == "3-line" ||
      currentLine == "4-line"
    ) {
      return new THREE.Vector3(railSegmentLength * -6, trainHeight, trackspace-3);
    }

    return new THREE.Vector3(
      railSegmentLength * 29,
      trainHeight,
      trackspace - 5
    ); //33
  }, [trainHeight, isReverse, currentLine]);


  //   return new THREE.Vector3(
  //     railSegmentLength * 0,
  //     trainHeight,
  //     trackspace - 5
  //   ); //33
  // }, [trainHeight, isReverse, currentLine]);

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
        minDistance={0.001}
        maxDistance={5000}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.45}
        minAzimuthAngle={-Math.PI * 0.45}
        maxAzimuthAngle={Math.PI * 0.45}
        minZoom={0.2}
        maxZoom={0.3}
        restThreshold={0.15}
      ></CameraControls>

      {/* <Terrain
        elevation="./terrain/height_create1.jpg"
        diffuse="./terrain/terrin_ground.jpg"
        size={2800}
        resolution={2048}
        height={-0.5}
        // position={[50, -17.3, 50]}
      /> */}

     {/* <TreesCollection
        positionOffset={[0, 0, 10]}
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }}
        spacing={7} // Dynamic spacing
      />

<TreesCollection
        positionOffset={[30, 0, 40]}
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }}
        spacing={8} // Dynamic spacing
      />

 <TreesCollection
        positionOffset={[30, 0, 40]}
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }}
        spacing={8} // Dynamic spacing
      />

<TreesCollection 
        positionOffset={[450, 0, 35]} 
        modelCounts={{
          TreesModel: 15,
          TreesModel2: 10,
        }} 
        spacing={10} // Dynamic spacing
      />
      <TreesCollection 
        positionOffset={[520, 0, 35]} 
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }} 
        spacing={10} // Dynamic spacing
      />
      <TreesCollection 
        positionOffset={[460, 0, -20]} 
        modelCounts={{
          TreesModel: 15,
          TreesModel2: 10,
        }} 
        spacing={10} // Dynamic spacing
      />
      <TreesCollection
        positionOffset={[550, 0, -23]}
        modelCounts={{
          TreesModel: 15,
          TreesModel2: 20,
        }} 
        spacing={10} // Dynamic spacing
      />
    <TreesCollection
        positionOffset={[700, 0, 30]}
        modelCounts={{
          TreesModel: 7,
          TreesModel2: 7,
        }}
        spacing={10} // Dynamic spacing
      />
      <TreesCollection
        positionOffset={[700, 0, -5]}
        modelCounts={{
          TreesModel: 7,
          TreesModel2: 7,
        }}
        spacing={8} // Dynamic spacing
      />

      
      <TreesCollection
        positionOffset={[300, 0, 380]}
        modelCounts={{
          TreesModel: 35,
          TreesModel2: 20,
        }}
        spacing={12} // Dynamic spacing
      />
      <TreesCollection
        positionOffset={[220, 0, 289]}
        modelCounts={{
          TreesModel: 25,
          TreesModel2: 35,
        }}
        spacing={12} // Dynamic spacing
      />

      <TreesCollection
        positionOffset={[150, 0, 380]}
        modelCounts={{
          TreesModel: 25,
          TreesModel2: 35,
        }}
        spacing={15} // Dynamic spacing
      />
       */}
      
      
      <Physics debug={isDebug} timeStep="vary" updateLoop="follow">
        <Railway />
        <Train position={trainPosition} />
      </Physics>

      {isDebug &&<Perf position="top-right" />}
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
