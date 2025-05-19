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
import { OverBridge } from "./OverBridge.tsx";
import { railSegmentLength, trackspace } from "../common";
import { useGlobalContext, useToggledComponent } from "../Hooks";
import { Station } from "./buildings/Station.tsx";
import { Railway } from "./Railway.jsx";
import { Train } from "./Train";
import { Camera } from "./Camera";
import { Terrain } from "./landscape/Terrain";
import { Water } from "./landscape/Water";
import TreesCollection from "./TreesCollection";
import { UnderBridge } from "./UnderBridge.tsx";
import { IndianShop } from "./buildings/IndianShop.tsx";
import { Buildings } from "./buildings/Buildings.tsx";
import { SmallHouse } from "./buildings/SmallHouse.tsx";
import { Construction } from "./buildings/Construction.tsx";
import { Building } from "./Building.tsx";
import { Cabin } from "./buildings/Cabin.tsx";
import { FobBridge } from "./buildings/FobBridge.tsx";
import { NewApartment, NewBuilding, PanelHouse, TallGreen } from "./NewBuilding.tsx";
// import { Farm }  from "../components/landscape/NewTrees.tsx";
import { Model as WareHouse1 } from "../models/building/WareHouseModel1.tsx";
import { GoodsTrain } from "./buildings/GoodsTrain.tsx";
import { useLoader } from "@react-three/fiber";
import { WareHouse } from "./WareHouseModel.tsx";
import { RailwayCrossing } from "./RailwayCrossing.tsx";
// import {Temple} from "./temple.tsx";
import { GreenGrassPatch } from "./landscape/GreenGrassPatch.tsx";
import { GrassDrySingle } from "../components/landscape/GrassDrySingle";
import { TreePatch } from "./landscape/TreePatch.tsx";
import Trees from "./landscape/TreeGroup.tsx";
import TreeGroup2 from "./landscape/TreeGroup2.tsx";




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
  const terrainSize = 1500;
  const trainHeight = 0.7;

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


    if (currentLine == "5 line"
      // ||currentLine == "9-line"  
    ) {
      return new THREE.Vector3(railSegmentLength * -28, trainHeight, trackspace );
    }

    // if(currentLine=="10-line" )
    // {
    //   return new THREE.Vector3(railSegmentLength * -10, trainHeight, trackspace -66);
    // }



    if(currentLine == "9-line")
    {
      return new THREE.Vector3(railSegmentLength * -15, trainHeight, trackspace );
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
      currentLine == "3-line" ||
      currentLine == "3 line"
    ) {
      return new THREE.Vector3(railSegmentLength * -6.5, trainHeight, trackspace-3);
    }


    if (
      // currentLine == "3 line" ||
      currentLine == "4 line"
    ) {
      return new THREE.Vector3(railSegmentLength * -9, trainHeight, trackspace-152);
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



  // const goodsTrainCount = 7; // Adjust the count as needed
  // const startPosition = [373.4, 0, 4]; // Starting position for the first GoodsTrain
  // const offset = 5.95; // The spacing between each GoodsTrain

  // const trains = [];

  // for (let i = 0; i < goodsTrainCount; i++) {
  //   const position = {
  //     x: startPosition[0] + i * offset, // Increment X position
  //     y: startPosition[1] - 0.925, // Y position stays the same
  //     z: startPosition[2] + 3.7, // Z position stays the same
  //   };

  //   trains.push(
  //     <GoodsTrain
  //       key={i}
  //       position={[position.x, position.y, position.z]}
  //       scale={0.6}
  //       rotation={[0, Math.PI / 2, 0]}
  //     />
  //   );
  // }

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
        height={30}
        position={[400, -17.25, 10]}
      /> */}

  <OverBridge
        scale={1}
        position={[220, 0, 4]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <UnderBridge
        scale={[0.04, 0.05, 0.05]}
        position={[490, -7.18, 4.5]}
        rotation={[0, Math.PI, 0]}
      />
      <Water
        // scale={[0.015, 0.06, 0.05]}
        position={[520, -10, 90]}
        rotation={[0, 0, 0]}
        width={180}
        length={terrainSize}
      />

      <TreeGroup2 
      //  the one with cross (bavaliya)
      position={[-120,0,-6]} 
      scale={1}/> 
      <TreeGroup2 
      position={[-118,0,-6]} 
      scale={1}/> 
      <TreeGroup2 
      position={[-122,0,-8]} 
      scale={1}/> 
      <TreeGroup2
      position={[-210,0,-5]}
      scale={1}/>
      <TreeGroup2
      position={[240,0,-5]}
      scale={1}/>
      <TreeGroup2
      position={[210,0,-5]}
      scale={1}/>
      <TreeGroup2
      position={[200,0,-5]}
      scale={1}/>
      <TreeGroup2 
      position={[-268,0,-20]} 
      scale={1.5}/>       
      <TreeGroup2 
      position={[-248,0,-20]} 
      scale={1.5}/>       
      <TreeGroup2 
      position={[-258,0,-20]} 
      scale={1.5}/> 
      <TreeGroup2 
      position={[-278,0,-10]} 
      scale={1.5}/> 
      <TreeGroup2 
      position={[-288,0,-10]} 
      scale={1.5}/> 
      <TreeGroup2 
      position={[-298,0,-10]} 
      scale={1.5}/> 
      <TreeGroup2 
      position={[-323,0,-10]} 
      scale={1.5}/> 


       <TreePatch
       //with bold green trees
      position={[-60,0,-3]}
      scale={1}/>
      <TreePatch
      position={[-40,0,4]}
      scale={0.5}/>
      <TreePatch
      position={[140,0,4]}
      scale={0.5}/>
      

    <GrassDrySingle
      position={[150,0,-13]}
      scale={1}
      />
      <GrassDrySingle
      position={[157,0,-17]}
      scale={1}
      />
      <GrassDrySingle
      position={[161,0,-17]}
      scale={1}
      />
      <GrassDrySingle
      position={[175,0,-13]}
      scale={2}
      />
      <GrassDrySingle
      position={[155,0,-23]}
      scale={2}
      />
      <GrassDrySingle
      position={[200,0,-10]}
      scale={1}
      />
      <GrassDrySingle
      position={[210,0,-13]}
      scale={2}
      />
       <GrassDrySingle
      position={[210,0,10]}
      scale={2}
      />

      <GrassDrySingle
      position={[250,0,-13]}
      scale={2}
      />
       <GrassDrySingle
      position={[240,0,13]}
      scale={3}
      />


      <Trees 
      position={[-200,2.5,-10]} 
      scale={1}/>
      <Trees 
      position={[251,2.5,0]} 
      scale={1}/>
      <Trees 
      position={[-240,2.5,-10]} 
      scale={1}/>
      <Trees 
      position={[-270,2.5,-15]} 
      scale={1}/>
      <Trees 
      position={[-280,2.5,-15]} 
      scale={1}/>
      <Trees 
      position={[-250,2.5,-10]} 
      scale={1}/>
      <Trees 
      position={[-290,2.5,-15]} 
      scale={1}/>
      <Trees 
      position={[-260,2.5,-10]} 
      scale={1}/>
      <Trees 
      position={[-300,2.5,-15]} 
      scale={1}/>
      <Trees 
      position={[-310,2.5,-10]} 
      scale={1}/>
      <Trees 
      position={[-330,2.5,-7]} 
      scale={1}/>


      <GreenGrassPatch
      position={[-150,0,-5]}
      rotation={[0,Math.PI/2,0]}
      scale={10}
      />
      <GreenGrassPatch
      position={[-5,0,50]}
      rotation={[0,Math.PI/2,0]}
      scale={10}
      />


     <TreesCollection
        positionOffset={[30, 0, 40]}
        modelCounts={{
          TreesModel: 2,
          TreesModel2: 3,
        }}
        spacing={4} // Dynamic spacing
      />

<TreesCollection
        positionOffset={[30, 0, -40]}
        modelCounts={{
          TreesModel: 5,
          TreesModel2: 3,
        }}
        spacing={8} // Dynamic spacing
      />

<TreesCollection
        positionOffset={[-380, 0, 45]}
        modelCounts={{
          TreesModel: 45,
          TreesModel2: 0,
        }}
        spacing={3} // Dynamic spacing
      />

<TreesCollection
        positionOffset={[-450, 0, 70]}
        modelCounts={{
          TreesModel: 0,
          TreesModel2: 56,
        }}
        spacing={5} // Dynamic spacing
      />

      
<TreesCollection 
        positionOffset={[80, 0, 60]} 
        modelCounts={{
          TreesModel: 2,
          TreesModel2: 1,
        }} 
        spacing={4} // Dynamic spacing
      />
      <TreesCollection 
        positionOffset={[120, 0, 100]} 
        modelCounts={{
          TreesModel: 4,
          TreesModel2: 5,
        }} 
        spacing={10} // Dynamic spacing
      />

    <TreesCollection 
        positionOffset={[250, 0, -16]} 
        modelCounts={{
          TreesModel: 5,
          TreesModel2: 10,
        }} 
        spacing={13} // Dynamic spacing
      />

<TreesCollection 
        positionOffset={[-300, 0, 55]} 
        modelCounts={{
          TreesModel: 14,
          TreesModel2: 10,
        }} 
        spacing={7} // Dynamic spacing
      />

<TreesCollection 
        positionOffset={[300, 0, 50]} 
        modelCounts={{
          TreesModel: 0,
          TreesModel2: 17,
        }} 
        spacing={6} // Dynamic spacing
      />

<TreesCollection 
        positionOffset={[510, 0, 50]} 
        modelCounts={{ 
          //near the under bridge
          TreesModel: 40,
          TreesModel2: 10,
        }} 
        spacing={10} // Dynamic spacing
      />

<TreesCollection 
        positionOffset={[420, 0, 50]} 
        modelCounts={{
          TreesModel: 10,
          TreesModel2: 10,
        }} 
        spacing={4} // Dynamic spacing
      />



      
      <TreesCollection
        positionOffset={[370, 0, 123]}
        modelCounts={{
          TreesModel: 15,
          TreesModel2: 20,
        }} 
        spacing={6} // Dynamic spacing
      />
    <TreesCollection
        positionOffset={[400, 0, 30]}
        modelCounts={{
          TreesModel: 7,
          TreesModel2: 7,
        }}
        spacing={10} // Dynamic spacing
      />
      <TreesCollection
        positionOffset={[400, 0, 35]}
        modelCounts={{
          TreesModel: 7,
          TreesModel2: 7,
        }}
        spacing={3} // Dynamic spacing
      />

      
      <TreesCollection
        positionOffset={[300, 0, 380]}
        modelCounts={{
          TreesModel: 35,
          TreesModel2: 20,
        }}
        spacing={5} // Dynamic spacing
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
{/* <Temple
        scale={0.5}
        position={[-50, 2.5, -85]}
        rotation={[0,-Math.PI/2, 0]}
      /> */}

    <Cabin
        scale={10}
        position={[-550, 0, 30]}
        rotation={[0, -Math.PI, 0]}
      />
      
      <RailwayCrossing
        scale={35}
        position={[-552, 0, 30]}
        rotation={[0, 0, 0]}
      />
      <TexturedPlane
        position={[-553, 0.05, 30]}
        scale={[2, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      />

<Cabin
        scale={10}
        position={[-560, 0, 3]}
        rotation={[0, -Math.PI, 0]}
      />
      
      <RailwayCrossing
        scale={35}
        position={[-562, 0, 0]}
        rotation={[0, 0, 0]}
      />
      <TexturedPlane
        position={[-563, 0.05, 3]}
        scale={[2, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      />


      
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
      <NewApartment
        position={[200, 0, -80]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
       <NewApartment
        position={[160, 0, -80]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
        <NewApartment
        position={[180, 0, -80]}
        rotation={[0, -3.2, 0]}
        scale={1}
      />
      <NewApartment
        position={[250, 0, -50]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1}
      />
      <PanelHouse
        position={[-390, 0, 320]}
        rotation={[0, Math.PI / 5, 0]}
        scale={0.5}
      />
      <NewApartment
        position={[130, 0, -80]}
        rotation={[0, Math.PI / 6, 0]}
        scale={1}
      />

      {/* <SmallHouse position={[15, 0, -20]}></SmallHouse> */}
      {/* <Building /> */}
      <WareHouse position={[100, 0, 50]} scale={0.1}></WareHouse>
      <WareHouse1
        position={[-104, 0, 270]}
        scale={[0.25, 0.15, 0.15]}
        rotation={[0, -1.4, 0]}
      />
    </>
  );
};
