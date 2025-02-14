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

import { BridgeStraight } from "./buildings/BridgeStraight.tsx";
import { WaterTank } from "./buildings/WaterTankModel.tsx";
import { RailwayCrossing } from "./RailwayCrossing.tsx";
import { OverBridge } from "./OverBridge.tsx";
import { UnderBridge } from "./UnderBridge.tsx";

import { useLoader } from "@react-three/fiber";
import { OldStation } from "./buildings/OldStation.tsx";
import { IndianShop } from "./buildings/IndianShop.tsx";
import { Buildings } from "./buildings/Buildings.tsx";
import { SmallHouse } from "./buildings/SmallHouse.tsx";
import { Construction } from "./buildings/Construction.tsx";
import { TreePatch } from "./landscape/TreePatch.tsx";

import { Building } from "./Building.tsx";
import {
  StationBuilding,
  StationBuildings,
} from "./buildings/StationBuilding.tsx";
import { PackedBridge } from "./PackedBridge.tsx";
import { WareHouse } from "./WareHouseModel.tsx";
import { GreenGrassPatch } from "./landscape/GreenGrassPatch.tsx";

import { Cabin } from "./buildings/Cabin.tsx";
import Trees from "./landscape/TreeGroup.tsx";
import TreeGroup2 from "./landscape/TreeGroup2.tsx";

import { Traint } from "./buildings/Testtrain.tsx";
import { GoodsTrain } from "./buildings/GoodsTrain.tsx";
import { FobBridge } from "./buildings/FobBridge.tsx";
import { NewApartment, NewBuilding, PanelHouse, TallGreen } from "./NewBuilding.tsx";
import { GrassDrySingle } from "../components/landscape/GrassDrySingle";
import TreesCollection from "./TreesCollection";
import { Farm }  from "../components/landscape/NewTrees.tsx";
import { Model as WareHouse1 } from "../models/building/WareHouseModel1.tsx";

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
  const { cameraControls, isDebug, isReverse, currentLine } =
    useGlobalContext();
  const terrainSize = 1500;
  const trainHeight = 0.7;
  const trainPosition = useMemo(() => {
    // return new THREE.Vector3(railSegmentLength * 0, trainHeight, 0);
    if (currentLine == "1-line" || currentLine == "2-line"  || currentLine == "1_line" || currentLine == "2_line") {
      return new THREE.Vector3(
        railSegmentLength * 0.5,
        trainHeight,
        trackspace - 5
      );
    }
    if (
      currentLine == "3 line" ||
      currentLine == "4 line" ||
      currentLine == "3-line" ||
      currentLine == "4-line"
    ) {
      return new THREE.Vector3(railSegmentLength * 8, trainHeight, 330);
    }
    if (
      currentLine == "1 line" ||
      currentLine == "2 line" ||
      currentLine == "5 line" ||
      currentLine == "6 line" ||
      currentLine == "7 line"
    ) {
      return new THREE.Vector3(
        -railSegmentLength * 7,
        trainHeight,
        -300
      );
    }

    return new THREE.Vector3(
      railSegmentLength * 29,
      trainHeight,
      trackspace - 5
    ); //33
  }, [trainHeight, isReverse, currentLine]);

  const cameraTarget = useRef<THREE.Object3D>();
  const TexturedPlane = ({ position, scale, rotation }) => {
    // Load the texture using useLoader
    const texture = useLoader(THREE.TextureLoader, "./terrain/trafficRoad.jpg");

    return (
      <mesh rotation={rotation} position={position} scale={scale}>
        {/* Add geometry (e.g., PlaneGeometry) */}
        <planeGeometry args={[5, 5]} />
        {/* Add material and apply the texture */}
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  };
  const goodsTrainCount = 7; // Adjust the count as needed
  const startPosition = [373.4, 0, 4]; // Starting position for the first GoodsTrain
  const offset = 5.95; // The spacing between each GoodsTrain

  const trains = [];

  for (let i = 0; i < goodsTrainCount; i++) {
    const position = {
      x: startPosition[0] + i * offset, // Increment X position
      y: startPosition[1] - 0.925, // Y position stays the same
      z: startPosition[2] + 3.7, // Z position stays the same
    };

    trains.push(
      <GoodsTrain
        key={i}
        position={[position.x, position.y, position.z]}
        scale={0.6}
        rotation={[0, Math.PI / 2, 0]}
      />
    );
  }

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
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.45}
        minAzimuthAngle={-Math.PI * 0.45}
        maxAzimuthAngle={Math.PI * 0.45}
        minZoom={0.2}
        maxZoom={0.3}
        restThreshold={0.15}
      ></CameraControls>

      <Terrain
        elevation="./terrain/height_create1.jpg"
        diffuse="./terrain/terrin_ground1.jpg"
        // diffuse="./terrain/rajkot-texture2.jpg"
        size={1800}
        resolution={256}
        height={30}
        position={[50, -17.3, 50]}
      />
      {/* First Trees Collection with model-wise counts (Near Station) */}
       <TreesCollection
        positionOffset={[0, 0, 10]}
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }}
        spacing={7} // Dynamic spacing
      />

      {/* Second Trees Collection with different model-wise counts (Near Station) */}
      <TreesCollection
        positionOffset={[30, 0, 40]}
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }}
        spacing={8} // Dynamic spacing
      />

      {/* Third Trees Collection with even more trees */}
       <TreesCollection 
        positionOffset={[237, 0, -45]} 
        modelCounts={{
          TreesModel: 40,
          TreesModel2: 30,
        }}
        spacing={20} // Dynamic spacing
      />
{/* (Near yard)  */}
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

    {/* Trees Collection for Hapa */}
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

      {/* Trees Collection for SUN - VER */}
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
      

      <Cabin
        scale={10}
        position={[-185, 0, -196]}
        rotation={[0, -Math.PI, 0]}
      />
      <RailwayCrossing
        scale={35}
        position={[-180, 0, -203]}
        rotation={[0, 0, 0]}
      />
      <TexturedPlane
        position={[-181, 0.05, -200]}
        scale={[2, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      />
      <RailwayCrossing
        scale={35}
        position={[-180, 0, -198]}
        rotation={[0, 0, 0]}
      />

      <Cabin scale={10} position={[225, 0, 345]} rotation={[0, 0, 0]} />
      <RailwayCrossing
        scale={35}
        position={[231, 0, 348]}
        rotation={[0, 0, 0]}
      />
      <TexturedPlane
        position={[230, 0.05, 340]}
        scale={[13, 1, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      />
      <RailwayCrossing
        scale={35}
        position={[231, 0, 356]}
        rotation={[0, 0, 0]}
      />

      <Cabin scale={10} position={[-110, 0, 0.5]} rotation={[0, 0.5, 0]} />
      <RailwayCrossing
        scale={35}
        position={[-103, 0, 2]}
        rotation={[0, 0.5, 0]}
      />
      <TexturedPlane
        position={[-100, 0.05, 10]}
        scale={[8, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 3]}
      />
      <RailwayCrossing
        scale={35}
        position={[-94, 0, 17]}
        rotation={[0, 0.5, 0]}
      />

      <Cabin scale={10} position={[552, 0, 7]} rotation={[0, 0, 0]} />
      <RailwayCrossing
        scale={35}
        position={[547, 0, 7.5]}
        rotation={[0, Math.PI, 0]}
      />
      <TexturedPlane
        position={[548.5, 0.05, 10]}
        scale={[8, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
      <RailwayCrossing
        scale={35}
        position={[550, 0, 16]}
        rotation={[0, 0, 0]}
      />

      <Cabin scale={10} position={[853, 0, 6.7]} rotation={[0, 0, 0]} />
      <RailwayCrossing
        scale={35}
        position={[850, 0, 7.5]}
        rotation={[0, 0, 0]}
      />
      <TexturedPlane
        position={[848.5, 0.05, 10]}
        scale={[8, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
      <RailwayCrossing
        scale={35}
        position={[850, 0, 16]}
        rotation={[0, 0, 0]}
      />

      <UnderBridge
        scale={[0.015, 0.02, 0.02]}
        position={[-166, 0, 230]}
        rotation={[0, Math.PI, 0]}
      />
      <PackedBridge
        scale={[0.06, 0.1, 0.1]}
        position={[750, 0, 20]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <OverBridge
        scale={1}
        position={[-60, 0, -200]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <WaterTank position={[150, 0, 40]} scale={0.2} rotation={[0, 0, 0]} />
      
      <Farm position={[-250, 0, 180]} scale={10} rotation={[0, 0, 0]} />

      <Water
        position={[100, -16, 90]}
        rotation={[0, 0, 0]}
        width={terrainSize }
        length={150}
      />
      <FobBridge
        position={[-23, 0, 1.5]}
        scale={0.9}
        rotation={[0, Math.PI, 0]}
      />
      <Station
        position={[0, 0, 4]}
        scale={[40, 80, 40]}
        rotation={[0, Math.PI, 0]}
      ></Station>
      <GrassDrySingle position={[-40, 0, 312]} scale={0.5} />
      <GrassDrySingle position={[-20, 0, 317]} scale={0.5} />
      <GrassDrySingle position={[-60, 0, 309]} scale={0.5} />
      <GrassDrySingle position={[-10, 0, 320]} scale={0.5} />
      <GrassDrySingle position={[1, 0, 325]} scale={0.5} />
      <GrassDrySingle position={[4, 0, 322]} scale={0.5} />
      <OldStation
        position={[-40, 0, 320]}
        scale={[25, 15, 10]}
        rotation={[0, Math.PI - 0.2, 0]}
      >
        {" "}
      </OldStation>

      <BridgeStraight
        position={[-170, -0.3, 175]}
        rotation={[0, 1.7, 0]}
        scale={[3.8, 3, 2]}
      />
      <BridgeStraight
        position={[-176, -0.3, 175]}
        rotation={[0, 1.75, 0]}
        scale={[3.8, 3, 2]}
      />

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


      <Traint
        position={[368, 0, 4]}
        scale={0.425}
        rotation={[0, Math.PI / 2, 0]}
      />
      {trains}
      <StationBuilding
        position={[0, 0, -250]}
        rotation={[0, Math.PI / 2, 0]}
        scale={20}
      />
      <NewApartment
        position={[-70, 0, -150]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
       <NewApartment
        position={[-50, 0, -150]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
        <NewApartment
        position={[-30, 0, -150]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
      <NewApartment
        position={[-350, 0, 350]}
        rotation={[0, Math.PI / 6, 0]}
        scale={1}
      />
      <PanelHouse
        position={[-390, 0, 320]}
        rotation={[0, Math.PI / 5, 0]}
        scale={0.5}
      />
      <NewApartment
        position={[-390, 0, 280]}
        rotation={[0, Math.PI / 6, 0]}
        scale={1}
      />

      {/* <SmallHouse position={[15, 0, -20]}></SmallHouse> */}
      <Building />
      <WareHouse position={[280, 0, -10]} scale={0.1}></WareHouse>
      <WareHouse1
        position={[-104, 0, 270]}
        scale={[0.25, 0.15, 0.15]}
        rotation={[0, -1.4, 0]}
      />
    </>
  );
};
