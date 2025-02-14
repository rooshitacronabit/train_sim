import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    stand002: THREE.Mesh
    Stairs002: THREE.Mesh
    st_1004: THREE.Mesh
    SS_3001: THREE.Mesh
    SS_2001: THREE.Mesh
    SS_1001: THREE.Mesh
    SLLT003: THREE.Mesh
    Mesh150: THREE.Mesh
    Mesh150_1: THREE.Mesh
    Octagon_with_7003: THREE.Mesh
    nut_4002: THREE.Mesh
    nut_3002: THREE.Mesh
    nut_2002: THREE.Mesh
    nut_1002: THREE.Mesh
    Lights_1008: THREE.Mesh
    hs_18001: THREE.Mesh
    FS_3002: THREE.Mesh
    FS_2002: THREE.Mesh
    FS_1002: THREE.Mesh
    SLLT001: THREE.Mesh
    BEG_Light_2001: THREE.Mesh
    GreenLight: THREE.Mesh
    RedLight: THREE.Mesh
    YellowLight: THREE.Mesh
    white_light_014: THREE.Mesh
    white_light_015: THREE.Mesh
    white_light_016: THREE.Mesh
    white_light_017: THREE.Mesh
    white_light_018: THREE.Mesh
    white_light_019: THREE.Mesh
    white_light_020: THREE.Mesh
    white_light_021: THREE.Mesh
    white_light_022: THREE.Mesh
    BEG_Light_1001: THREE.Mesh
    BEG_Light_1004: THREE.Mesh
    BEG_Light_2002: THREE.Mesh
    BEG_Light_2003: THREE.Mesh
    BEG_Light_3001: THREE.Mesh
    BEG_Light_3004: THREE.Mesh
    BEG_Light_4002: THREE.Mesh
    BEG_Light_5002: THREE.Mesh
    BEG_Light_9002: THREE.Mesh
    board004: THREE.Mesh
    board001: THREE.Mesh
    cube002: THREE.Mesh
    hs_17002: THREE.Mesh
    hs_16002: THREE.Mesh
    Light_1002: THREE.Mesh
   
   
  }
  materials: {
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.021']: THREE.MeshStandardMaterial
    ['Material.109']: THREE.MeshBasicMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./signal-main-lunar.glb") as GLTFResult;

  // console.log("NODE S : ", nodes);

  if (Object.keys(nodes).includes("YELLOW_light_040")) {
    nodes["YellowLight"] = nodes["YELLOW_light_040"];
  }
  if (Object.keys(nodes).includes("RAD__light_039")) {
    nodes["RedLight"] = nodes["RAD__light_039"];
  }
  if (Object.keys(nodes).includes("GREEN_light_")) {
    nodes["GreenLight"] = nodes["GREEN_light_"];
  }

  return (
    <group {...props} dispose={null}>
      <mesh name="stand002" geometry={nodes.stand002.geometry} material={materials['Material.008']} position={[0, 0.297, -0.017]} scale={[1.08, 1, 1.109]} />
      <mesh name="Stairs002" geometry={nodes.Stairs002.geometry} material={materials['Material.009']} position={[-0.709, 3.646, 0.003]} />
      <mesh name="st_1004" geometry={nodes.st_1004.geometry} material={materials['Material.009']} position={[0.482, 4.125, 0.002]} />
      <mesh name="SS_3001" geometry={nodes.SS_3001.geometry} material={materials['Material.009']} position={[0.323, 4.213, 0.002]} />
      <mesh name="SS_2001" geometry={nodes.SS_2001.geometry} material={materials['Material.009']} position={[0.486, 4.213, 0.149]} />
      <mesh name="SS_1001" geometry={nodes.SS_1001.geometry} material={materials['Material.009']} position={[0.486, 4.213, -0.133]} />
      <mesh name="SLLT003" geometry={nodes.SLLT003.geometry} material={materials['Material.009']} position={[0.069, 6.464, 0.505]} />
      <group name="pole002" position={[0.007, 3.011, -0.015]} scale={[1, 1.407, 1]}>
        <mesh name="Mesh150" geometry={nodes.Mesh150.geometry} material={materials['Material.009']} />
        <mesh name="Mesh150_1" geometry={nodes.Mesh150_1.geometry} material={materials['Material.021']} />
      </group>
      <mesh name="Octagon_with_7003" geometry={nodes.Octagon_with_7003.geometry} material={materials['Material.009']} position={[-0.119, 5.952, -0.005]} />
      <mesh name="nut_4002" geometry={nodes.nut_4002.geometry} material={materials['Material.009']} position={[-0.103, 0.649, -0.1]} />
      <mesh name="nut_3002" geometry={nodes.nut_3002.geometry} material={materials['Material.009']} position={[-0.103, 0.649, 0.106]} />
      <mesh name="nut_2002" geometry={nodes.nut_2002.geometry} material={materials['Material.009']} position={[0.103, 0.649, 0.106]} />
      <mesh name="nut_1002" geometry={nodes.nut_1002.geometry} material={materials['Material.009']} position={[0.103, 0.649, -0.1]} />
      <mesh name="Lights_1008" geometry={nodes.Lights_1008.geometry} material={materials['Material.009']} position={[0.493, 4.558, 0.048]} scale={0.915} />
      <mesh name="hs_18001" geometry={nodes.hs_18001.geometry} material={materials['Material.009']} position={[0.636, 3.999, 0.005]} />
      <mesh name="FS_3002" geometry={nodes.FS_3002.geometry} material={materials['Material.009']} position={[-0.009, 3.936, 0]} />
      <mesh name="FS_2002" geometry={nodes.FS_2002.geometry} material={materials['Material.009']} position={[0, 2.26, 0.003]} />
      <mesh name="FS_1002" geometry={nodes.FS_1002.geometry} material={materials['Material.009']} position={[0.042, 1.615, 0.003]} />
      <mesh name="SLLT001" geometry={nodes.SLLT001.geometry} material={materials['Material.009']} position={[0.069, 6.461, -0.521]} />
      <mesh name="BEG_Light_2001" geometry={nodes.BEG_Light_2001.geometry} material={materials['Material.009']} position={[0.638, 5.102, -0.731]} scale={0.915} />
      <mesh name="GreenLight" geometry={nodes.GreenLight.geometry} material={materials['Material.109']} position={[0.581, 5.403, 0.009]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="RedLight" geometry={nodes.RedLight.geometry} material={materials['Material.109']} position={[0.581, 4.767, 0.011]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="YellowLight" geometry={nodes.YellowLight.geometry} material={materials['Material.109']} position={[0.581, 5.087, 0.011]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="WhiteLight01" geometry={nodes.white_light_014.geometry} material={materials['Material.109']} position={[0.156, 5.952, -0.005]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight02" geometry={nodes.white_light_015.geometry} material={materials['Material.109']} position={[0.156, 6.126, 0.157]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight03" geometry={nodes.white_light_016.geometry} material={materials['Material.109']} position={[0.156, 6.335, 0.375]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight04" geometry={nodes.white_light_017.geometry} material={materials['Material.109']} position={[0.156, 6.503, 0.544]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight05" geometry={nodes.white_light_018.geometry} material={materials['Material.109']} position={[0.156, 6.671, 0.714]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight06" geometry={nodes.white_light_019.geometry} material={materials['Material.109']} position={[0.17, 6.653, -0.751]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight07" geometry={nodes.white_light_020.geometry} material={materials['Material.109']} position={[0.17, 6.486, -0.577]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight08" geometry={nodes.white_light_021.geometry} material={materials['Material.109']} position={[0.17, 6.317, -0.408]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight09" geometry={nodes.white_light_022.geometry} material={materials['Material.109']} position={[0.17, 6.114, -0.182]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="BEG_Light_1001" geometry={nodes.BEG_Light_1001.geometry} material={materials['Material.009']} position={[0.227, 6.689, 0.716]} />
      <mesh name="BEG_Light_2003" geometry={nodes.BEG_Light_2003.geometry} material={materials['Material.009']} position={[0.225, 6.517, 0.545]} />
      <mesh name="BEG_Light_3001" geometry={nodes.BEG_Light_3001.geometry} material={materials['Material.009']} position={[0.228, 6.349, 0.376]} />
      <mesh name="BEG_Light_4002" geometry={nodes.BEG_Light_4002.geometry} material={materials['Material.009']} position={[0.225, 5.97, -0.004]} />
      <mesh name="BEG_Light_5002" geometry={nodes.BEG_Light_5002.geometry} material={materials['Material.009']} position={[0.228, 6.131, -0.179]} />
      <mesh name="BEG_Light_9002" geometry={nodes.BEG_Light_9002.geometry} material={materials['Material.009']} position={[0.227, 6.142, 0.158]} />
      <mesh name="board004" geometry={nodes.board004.geometry} material={materials['Material.009']} position={[0.314, 4.033, -0.001]} />
      <mesh name="board001" geometry={nodes.board001.geometry} material={materials['Material.009']} position={[0.329, 2.321, 0.002]} />
      <mesh name="cube002" geometry={nodes.cube002.geometry} material={materials['Material.009']} position={[0.408, 2.63, 0.003]} />
      <mesh name="hs_17002" geometry={nodes.hs_17002.geometry} material={materials['Material.009']} position={[0.547, 2.982, 0.003]} />
      <mesh name="hs_16002" geometry={nodes.hs_16002.geometry} material={materials['Material.009']} position={[0.509, 2.364, 0.003]} />
      <mesh name="Light_1002" geometry={nodes.Light_1002.geometry} material={materials['Material.009']} position={[0.166, 1.761, 0.003]} />
      <mesh name="BEG_Light_1004" geometry={nodes.BEG_Light_1004.geometry} material={materials['Material.009']} position={[0.227, 6.671, -0.748]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="BEG_Light_2002" geometry={nodes.BEG_Light_2002.geometry} material={materials['Material.009']} position={[0.225, 6.501, -0.575]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="BEG_Light_3004" geometry={nodes.BEG_Light_3004.geometry} material={materials['Material.009']} position={[0.228, 6.332, -0.406]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload("./signal-main-lunar.glb");
