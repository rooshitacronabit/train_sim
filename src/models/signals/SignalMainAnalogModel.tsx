import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    FS_1004: THREE.Mesh
    FS_2005: THREE.Mesh
    FS_3006: THREE.Mesh
    Octagon_with_7004: THREE.Mesh
    SLLL001: THREE.Mesh
    SLLM: THREE.Mesh
    SLLT: THREE.Mesh
    Stairs006: THREE.Mesh
    stand006: THREE.Mesh
    nut_1006: THREE.Mesh
    nut_2006: THREE.Mesh
    nut_3006: THREE.Mesh
    nut_4006: THREE.Mesh
    SS_1006: THREE.Mesh
    SS_2006: THREE.Mesh
    SS_3006: THREE.Mesh
    st_1005: THREE.Mesh
    st_2001: THREE.Mesh
    st_3001: THREE.Mesh
    hs_18004: THREE.Mesh
    Lights_1003: THREE.Mesh
    Mesh024: THREE.Mesh
    Mesh024_1: THREE.Mesh
    SS_1007: THREE.Mesh
    SS_2007: THREE.Mesh
    SS_3007: THREE.Mesh
    st_1006: THREE.Mesh
    RedLight: THREE.Mesh
    YellowLight: THREE.Mesh
    GreenLight: THREE.Mesh
    white_light_023: THREE.Mesh
    white_light_024: THREE.Mesh
    white_light_025: THREE.Mesh
    white_light_026: THREE.Mesh
    white_light_027: THREE.Mesh
    white_light_028: THREE.Mesh
    white_light_029: THREE.Mesh
    white_light_030: THREE.Mesh
    white_light_031: THREE.Mesh
    white_light_032: THREE.Mesh
    white_light_033: THREE.Mesh
    white_light_034: THREE.Mesh
    white_light_035: THREE.Mesh
    Light_1004: THREE.Mesh
    board008: THREE.Mesh
    cube004: THREE.Mesh
    hs_17004: THREE.Mesh
    pipe_1001: THREE.Mesh
    pipe_2001: THREE.Mesh
    pipe_3001: THREE.Mesh
    hs_16004: THREE.Mesh
    board009: THREE.Mesh
    BEG_Light_4: THREE.Mesh
    BEG_Light_5: THREE.Mesh
    BEG_Light_9: THREE.Mesh
    BEG_Light_10: THREE.Mesh
    BEG_Light_1008: THREE.Mesh
    BEG_Light_1009: THREE.Mesh
    BEG_Light_1010: THREE.Mesh
    BEG_Light_2007: THREE.Mesh
    BEG_Light_2009: THREE.Mesh
    BEG_Light_2010: THREE.Mesh
    BEG_Light_2011: THREE.Mesh
    BEG_Light_3005: THREE.Mesh
    BEG_Light_3007: THREE.Mesh
    BEG_Light_3008: THREE.Mesh
  }
  materials: {
    ['Material.078']: THREE.MeshStandardMaterial
    ['Material.016']: THREE.MeshStandardMaterial
    ['Material.019']: THREE.MeshStandardMaterial
    ['Material.110']: THREE.MeshBasicMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./signal-main-analog.glb") as GLTFResult;

  console.log("Nodes: " ,nodes);
  
  
  if (Object.keys(nodes).includes("WELLO_light_043")) {
    nodes["YellowLight"] = nodes["WELLO_light_043"];
  }
  if (Object.keys(nodes).includes("RED__light_042")) {
    nodes["RedLight"] = nodes["RED__light_042"];
  }
  if (Object.keys(nodes).includes("GREEN_light_044")) {
    nodes["GreenLight"] = nodes["GREEN_light_044"];
  }
 
  return (
    <group {...props} dispose={null}>
      <mesh name="FS_1004" geometry={nodes.FS_1004.geometry} material={materials['Material.078']} position={[0, -0.005, 0.216]} />
      <mesh name="FS_2005" geometry={nodes.FS_2005.geometry} material={materials['Material.078']} position={[0, 0.291, 0.216]} />
      <mesh name="FS_3006" geometry={nodes.FS_3006.geometry} material={materials['Material.078']} position={[0, 0.845, 0.212]} />
      <mesh name="Octagon_with_7004" geometry={nodes.Octagon_with_7004.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="SLLL001" geometry={nodes.SLLL001.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="SLLM" geometry={nodes.SLLM.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="SLLT" geometry={nodes.SLLT.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="Stairs006" geometry={nodes.Stairs006.geometry} material={materials['Material.078']} position={[0, 0.971, 0.216]} />
      <mesh name="stand006" geometry={nodes.stand006.geometry} material={materials['Material.016']} position={[0, 0, 0.216]} scale={[1.08, 1, 1.109]} />
      <mesh name="nut_1006" geometry={nodes.nut_1006.geometry} material={materials['Material.078']} position={[0, 0, 0.216]} />
      <mesh name="nut_2006" geometry={nodes.nut_2006.geometry} material={materials['Material.078']} position={[0, 0, 0.216]} />
      <mesh name="nut_3006" geometry={nodes.nut_3006.geometry} material={materials['Material.078']} position={[0, 0, 0.216]} />
      <mesh name="nut_4006" geometry={nodes.nut_4006.geometry} material={materials['Material.078']} position={[0, 0, 0.216]} />
      <mesh name="SS_1006" geometry={nodes.SS_1006.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="SS_2006" geometry={nodes.SS_2006.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="SS_3006" geometry={nodes.SS_3006.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="st_1005" geometry={nodes.st_1005.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="st_2001" geometry={nodes.st_2001.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="st_3001" geometry={nodes.st_3001.geometry} material={materials['Material.078']} position={[-0.005, 1.209, 0.213]} />
      <mesh name="hs_18004" geometry={nodes.hs_18004.geometry} material={materials['Material.078']} position={[0.636, 3.999, 0.038]} />
      <mesh name="Lights_1003" geometry={nodes.Lights_1003.geometry} material={materials['Material.078']} position={[0.495, 4.609, 0.072]} />
      <group name="pole006" position={[0.007, 3.189, 0.018]} scale={[1, 1.476, 1]}>
        <mesh name="Mesh024" geometry={nodes.Mesh024.geometry} material={materials['Material.078']} />
        <mesh name="Mesh024_1" geometry={nodes.Mesh024_1.geometry} material={materials['Material.019']} />
      </group>
      <mesh name="SS_1007" geometry={nodes.SS_1007.geometry} material={materials['Material.078']} position={[0.486, 4.213, -0.101]} />
      <mesh name="SS_2007" geometry={nodes.SS_2007.geometry} material={materials['Material.078']} position={[0.486, 4.213, 0.182]} />
      <mesh name="SS_3007" geometry={nodes.SS_3007.geometry} material={materials['Material.078']} position={[0.323, 4.213, 0.034]} />
      <mesh name="st_1006" geometry={nodes.st_1006.geometry} material={materials['Material.078']} position={[0.482, 4.125, 0.034]} />
      <mesh name="BEG_Light_2011" geometry={nodes.BEG_Light_2011.geometry} material={materials['Material.078']} position={[0.638, 5.195, -0.699]} scale={0.915} />
      <mesh name="RedLight" geometry={nodes.RedLight.geometry} material={materials['Material.110']} position={[0.581, 4.862, 0.039]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="YellowLight" geometry={nodes.YellowLight.geometry} material={materials['Material.110']} position={[0.581, 5.181, 0.039]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="GreenLight" geometry={nodes.GreenLight.geometry} material={materials['Material.110']} position={[0.581, 5.498, 0.037]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="WhiteLight01" geometry={nodes.white_light_023.geometry} material={materials['Material.110']} position={[0.157, 7.069, 0.746]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight02" geometry={nodes.white_light_024.geometry} material={materials['Material.110']} position={[0.157, 6.901, 0.576]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight03" geometry={nodes.white_light_025.geometry} material={materials['Material.110']} position={[0.157, 6.733, 0.407]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight06" geometry={nodes.white_light_026.geometry} material={materials['Material.110']} position={[0.157, 6.347, 1.045]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight07" geometry={nodes.white_light_027.geometry} material={materials['Material.110']} position={[0.157, 6.35, 0.803]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight08" geometry={nodes.white_light_028.geometry} material={materials['Material.110']} position={[0.157, 6.347, 0.563]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight04" geometry={nodes.white_light_029.geometry} material={materials['Material.110']} position={[0, 6.339, 0.035]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight05" geometry={nodes.white_light_030.geometry} material={materials['Material.110']} position={[0, 6.335, 0.026]} rotation={[-0.001, 0.01, 1.551]}  scale={[0.235, 0.11, 0.235]}/>
      <mesh name="WhiteLight09" geometry={nodes.white_light_031.geometry} material={materials['Material.110']} position={[nodes.white_light_031.position.x,nodes.white_light_031.position.y,nodes.white_light_031.position.z]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]}/>
      <mesh name="WhiteLight10" geometry={nodes.white_light_032.geometry} material={materials['Material.110']} position={[nodes.white_light_032.position.x,nodes.white_light_032.position.y,nodes.white_light_032.position.z]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]}/>
      <mesh name="WhiteLight11" geometry={nodes.white_light_033.geometry} material={materials['Material.110']} position={[nodes.white_light_033.position.x,nodes.white_light_033.position.y,nodes.white_light_033.position.z]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]}/>
      <mesh name="WhiteLight12" geometry={nodes.white_light_034.geometry} material={materials['Material.110']} position={[nodes.white_light_034.position.x,nodes.white_light_034.position.y,nodes.white_light_034.position.z]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]}/>
      <mesh name="WhiteLight13" geometry={nodes.white_light_035.geometry} material={materials['Material.110']} position={[nodes.white_light_035.position.x,nodes.white_light_035.position.y,nodes.white_light_035.position.z]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]}/>
    
      <mesh name="Light_1004" geometry={nodes.Light_1004.geometry} material={materials['Material.078']} position={[0, -0.005, 0.216]} />
      <mesh name="board008" geometry={nodes.board008.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="cube004" geometry={nodes.cube004.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="hs_17004" geometry={nodes.hs_17004.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="pipe_1001" geometry={nodes.pipe_1001.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="pipe_2001" geometry={nodes.pipe_2001.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="pipe_3001" geometry={nodes.pipe_3001.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="hs_16004" geometry={nodes.hs_16004.geometry} material={materials['Material.078']} position={[0, -0.038, 0.216]} />
      <mesh name="board009" geometry={nodes.board009.geometry} material={materials['Material.078']} position={[0, 0.845, 0.212]} />
      <mesh name="BEG_Light_4" geometry={nodes.BEG_Light_4.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_5" geometry={nodes.BEG_Light_5.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_9" geometry={nodes.BEG_Light_9.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_9" geometry={nodes.BEG_Light_9.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_1008" geometry={nodes.BEG_Light_1008.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_1009" geometry={nodes.BEG_Light_1009.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_1010" geometry={nodes.BEG_Light_1010.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_2007" geometry={nodes.BEG_Light_2007.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_2009" geometry={nodes.BEG_Light_2009.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_2010" geometry={nodes.BEG_Light_2010.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_2011" geometry={nodes.BEG_Light_2011.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_3005" geometry={nodes.BEG_Light_3005.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_3007" geometry={nodes.BEG_Light_3007.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
      <mesh name="BEG_Light_3008" geometry={nodes.BEG_Light_3008.geometry} material={materials['Material.078']} position={[0, 1.231, 0.208]} />
    </group>
  )
  }
  

  // return (
  //   <group {...props} dispose={null}>
      
  //     <mesh name="YELLOW_light_046" geometry={nodes.WELLO_light_043.geometry} material={materials["Material.114"]} position={[0.142, 5.126, -0.007]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
  //     <mesh name="RED_light_047" geometry={nodes.RED__light_042?.geometry} material={materials["Material.114"]} position={[0.145, 4.772, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
  //     <mesh name="_GREEN_light_045" geometry={nodes.GREEN_light_044?.geometry} material={materials["Material.113"]} position={[0.142, 5.51, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
  //     <mesh name="BEG_Light_2012" geometry={nodes.BEG_Light_2012.geometry} material={materials["Material.064"]} position={[0.215, 5.144, -1]} />
  //     <mesh name="board010" geometry={nodes.board010.geometry} material={materials["Material.042"]} position={[0.359, 2.311, -0.011]} />
  //     <mesh name="cube005" geometry={nodes.cube005.geometry} material={materials["Material.042"]} position={[0.448, 2.651, -0.01]} />
  //     <mesh name="FS_2006" geometry={nodes.FS_2006.geometry} material={materials["Material.042"]} position={[0, 2.225, -0.01]} />
  //     <mesh name="FS_3007" geometry={nodes.FS_3007.geometry} material={materials["Material.043"]} position={[-0.01, 3.393, 0.01]} />
  //     <mesh name="hs_16005" geometry={nodes.hs_16005.geometry} material={materials["Material.040"]} position={[0.559, 2.35, -0.01]} />
  //     <mesh name="hs_17005" geometry={nodes.hs_17005.geometry} material={materials["Material.040"]} position={[0.601, 3.038, -0.01]} />
  //     <mesh name="hs_18005" geometry={nodes.hs_18005.geometry} material={materials["Material.040"]} position={[0.204, 4.008, 0.008]} />
  //     <mesh name="Lights_1004" geometry={nodes.Lights_1004.geometry} material={materials["Material.043"]} position={[0.063, 4.606, 0.04]} />
  //     <mesh name="nut_1007" geometry={nodes.nut_1007.geometry} material={materials["Material.043"]} position={[0.12, 0.694, -0.111]} />
  //     <mesh name="nut_2007" geometry={nodes.nut_2007.geometry} material={materials["Material.043"]} position={[0.12, 0.694, 0.115]} />
  //     <mesh name="nut_3007" geometry={nodes.nut_3007.geometry} material={materials["Material.043"]} position={[-0.107, 0.694, 0.115]} />
  //     <mesh name="nut_4007" geometry={nodes.nut_4007.geometry} material={materials["Material.044"]} position={[-0.107, 0.694, -0.111]} />
  //     <mesh name="pipe_1002" geometry={nodes.pipe_1002.geometry} material={materials["Material.042"]} position={[0.628, 2.871, -0.011]} />
  //     <mesh name="pipe_2002" geometry={nodes.pipe_2002.geometry} material={materials["Material.042"]} position={[0.628, 2.739, -0.076]} />
  //     <mesh name="pipe_3002" geometry={nodes.pipe_3002.geometry} material={materials["Material.042"]} position={[0.628, 2.739, 0.054]} />
  //     <group name="pole003" position={[0.007, 2.41, 0.001]}>
  //       <mesh name="Mesh085" geometry={nodes.Mesh085.geometry} material={materials["Material.043"]} />
  //       <mesh name="Mesh085_1" geometry={nodes.Mesh085_1.geometry} material={materials["Material.045"]} />
  //     </group>
  //     <mesh name="SS_1008" geometry={nodes.SS_1008.geometry} material={materials["Material.043"]} position={[0.054, 4.222, -0.133]} />
  //     <mesh name="SS_2008" geometry={nodes.SS_2008.geometry} material={materials["Material.043"]} position={[0.054, 4.222, 0.149]} />
  //     <mesh name="SS_3008" geometry={nodes.SS_3008.geometry} material={materials["Material.043"]} position={[-0.109, 4.222, 0.002]} />
  //     <mesh name="st_1007" geometry={nodes.st_1007.geometry} material={materials["Material.043"]} position={[0.05, 4.134, 0.002]} />
  //     <mesh name="Stairs007" geometry={nodes.Stairs007.geometry} material={materials["Material.043"]} position={[-0.787, 3.128, 0.009]} />
  //     <mesh name="stand007" geometry={nodes.stand007.geometry} material={materials["Material.046"]} position={[0, 0.326, 0.008]} />
  //   </group>
  // )


useGLTF.preload("./signal-main-analog.glb");
