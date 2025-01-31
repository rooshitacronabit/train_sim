import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    FS_1003: THREE.Mesh
    FS_2003: THREE.Mesh
    FS_3004: THREE.Mesh
    hs_18003: THREE.Mesh
    Lights_1001: THREE.Mesh
    nut_1004: THREE.Mesh
    nut_2004: THREE.Mesh
    nut_3004: THREE.Mesh
    nut_4004: THREE.Mesh
    Octagon_with_7002: THREE.Mesh
    Mesh274: THREE.Mesh
    Mesh274_1: THREE.Mesh
    SLLT005: THREE.Mesh
    SS_1003: THREE.Mesh
    SS_2003: THREE.Mesh
    SS_3003: THREE.Mesh
    st_1002: THREE.Mesh
    Stairs004: THREE.Mesh
    stand004: THREE.Mesh
    BEG_Light_2008: THREE.Mesh
    GreenLight: THREE.Mesh
    YellowLight: THREE.Mesh
    RedLight: THREE.Mesh
    white_light_009: THREE.Mesh
    white_light_010: THREE.Mesh
    white_light_011: THREE.Mesh
    white_light_012: THREE.Mesh
    white_light_013: THREE.Mesh
    Light_1003: THREE.Mesh
    board006: THREE.Mesh
    cube003: THREE.Mesh
    hs_17003: THREE.Mesh
    hs_16003: THREE.Mesh
    board005: THREE.Mesh
    BEG_Light_4003: THREE.Mesh
    BEG_Light_9003: THREE.Mesh
    BEG_Light_1007: THREE.Mesh
    BEG_Light_2006: THREE.Mesh
    BEG_Light_3006: THREE.Mesh
  }
  materials: {
    ['Material.048']: THREE.MeshStandardMaterial
    ['Material.051']: THREE.MeshStandardMaterial
    ['Material.047']: THREE.MeshStandardMaterial
    ['Material.104']: THREE.MeshBasicMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./signal-main-lunar-left.glb"
  ) as GLTFResult;
  // console.log("signalmain model : ", nodes, materials);

  // console.log("Node : ", nodes);

  if (Object.keys(nodes).includes("YELLOW_light_037")) {
    nodes["YellowLight"] = nodes["YELLOW_light_037"];
  }
  if (Object.keys(nodes).includes("RED_light_038")) {
    nodes["RedLight"] = nodes["RED_light_038"];
  }
  if (Object.keys(nodes).includes("GREEN_light_036")) {
    nodes["GreenLight"] = nodes["GREEN_light_036"];
  }

  return (
    <group {...props} dispose={null}>
      <mesh name="FS_1003" geometry={nodes.FS_1003.geometry} material={materials['Material.048']} position={[0.042, 1.615, 0.029]} />
      <mesh name="FS_2003" geometry={nodes.FS_2003.geometry} material={materials['Material.048']} position={[0, 2.26, 0.029]} />
      <mesh name="FS_3004" geometry={nodes.FS_3004.geometry} material={materials['Material.048']} position={[-0.009, 3.936, 0.027]} />
      <mesh name="hs_18003" geometry={nodes.hs_18003.geometry} material={materials['Material.048']} position={[0.636, 3.999, 0.031]} />
      <mesh name="Lights_1001" geometry={nodes.Lights_1001.geometry} material={materials['Material.048']} position={[0.493, 4.558, 0.074]} scale={0.915} />
      <mesh name="nut_1004" geometry={nodes.nut_1004.geometry} material={materials['Material.048']} position={[0.103, 0.649, -0.074]} />
      <mesh name="nut_2004" geometry={nodes.nut_2004.geometry} material={materials['Material.048']} position={[0.103, 0.649, 0.132]} />
      <mesh name="nut_3004" geometry={nodes.nut_3004.geometry} material={materials['Material.048']} position={[-0.103, 0.649, 0.132]} />
      <mesh name="nut_4004" geometry={nodes.nut_4004.geometry} material={materials['Material.048']} position={[-0.103, 0.649, -0.074]} />
      <mesh name="Octagon_with_7002" geometry={nodes.Octagon_with_7002.geometry} material={materials['Material.048']} position={[-0.119, 5.952, 0.021]} />
      <group name="pole004" position={[0.007, 3.011, 0.011]} scale={[1, 1.407, 1]}>
        <mesh name="Mesh274" geometry={nodes.Mesh274.geometry} material={materials['Material.048']} />
        <mesh name="Mesh274_1" geometry={nodes.Mesh274_1.geometry} material={materials['Material.051']} />
      </group>
      <mesh name="SLLT005" geometry={nodes.SLLT005.geometry} material={materials['Material.048']} position={[0.069, 6.464, 0.532]} />
      <mesh name="SS_1003" geometry={nodes.SS_1003.geometry} material={materials['Material.048']} position={[0.486, 4.213, -0.107]} />
      <mesh name="SS_2003" geometry={nodes.SS_2003.geometry} material={materials['Material.048']} position={[0.486, 4.213, 0.175]} />
      <mesh name="SS_3003" geometry={nodes.SS_3003.geometry} material={materials['Material.048']} position={[0.323, 4.213, 0.028]} />
      <mesh name="st_1002" geometry={nodes.st_1002.geometry} material={materials['Material.048']} position={[0.482, 4.125, 0.028]} />
      <mesh name="Stairs004" geometry={nodes.Stairs004.geometry} material={materials['Material.048']} position={[-0.709, 3.646, 0.029]} />
      <mesh name="stand004" geometry={nodes.stand004.geometry} material={materials['Material.047']} position={[0, 0.297, 0.009]} scale={[1.08, 1, 1.109]} />
      <mesh name="BEG_Light_2008" geometry={nodes.BEG_Light_2008.geometry} material={materials['Material.048']} position={[0.638, 5.102, -0.705]} scale={0.915} />
      <mesh name="GreenLight" geometry={nodes.GreenLight.geometry} material={materials['Material.104']} position={[0.581, 5.403, 0.032]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="YellowLight" geometry={nodes.YellowLight.geometry} material={materials['Material.104']} position={[0.581, 5.087, 0.035]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="RedLight" geometry={nodes.RedLight.geometry} material={materials['Material.104']} position={[0.581, 4.767, 0.035]} rotation={[-0.001, 0.01, 1.551]} scale={[0.215, 0.1, 0.215]} />
      <mesh name="WhiteLight01" geometry={nodes.white_light_009.geometry} material={materials['Material.104']} position={[0.165, 6.67, 0.739]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight02" geometry={nodes.white_light_010.geometry} material={materials['Material.104']} position={[0.165, 6.502, 0.57]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight03" geometry={nodes.white_light_011.geometry} material={materials['Material.104']} position={[0.165, 6.334, 0.4]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight04" geometry={nodes.white_light_012.geometry} material={materials['Material.104']} position={[0.165, 6.125, 0.182]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="WhiteLight05" geometry={nodes.white_light_013.geometry} material={materials['Material.104']} position={[0.165, 5.951, 0.02]} rotation={[-0.001, 0.01, 1.551]} scale={[0.235, 0.11, 0.235]} />
      <mesh name="Light_1003" geometry={nodes.Light_1003.geometry} material={materials['Material.048']} position={[0.166, 1.761, 0.029]} />
      <mesh name="board006" geometry={nodes.board006.geometry} material={materials['Material.048']} position={[0.329, 2.321, 0.029]} />
      <mesh name="cube003" geometry={nodes.cube003.geometry} material={materials['Material.048']} position={[0.408, 2.63, 0.029]} />
      <mesh name="hs_17003" geometry={nodes.hs_17003.geometry} material={materials['Material.048']} position={[0.547, 2.982, 0.029]} />
      <mesh name="hs_16003" geometry={nodes.hs_16003.geometry} material={materials['Material.048']} position={[0.509, 2.364, 0.029]} />
      <mesh name="board005" geometry={nodes.board005.geometry} material={materials['Material.048']} position={[0.314, 4.033, 0.025]} />
      <mesh name="BEG_Light_4003" geometry={nodes.BEG_Light_4003.geometry} material={materials['Material.048']} position={[0.225, 5.97, 0.022]} />
      <mesh name="BEG_Light_9003" geometry={nodes.BEG_Light_9003.geometry} material={materials['Material.048']} position={[0.227, 6.142, 0.184]} />
      <mesh name="BEG_Light_1007" geometry={nodes.BEG_Light_1007.geometry} material={materials['Material.048']} position={[0.227, 6.689, 0.742]} />
      <mesh name="BEG_Light_2006" geometry={nodes.BEG_Light_2006.geometry} material={materials['Material.048']} position={[0.225, 6.517, 0.572]} />
      <mesh name="BEG_Light_3006" geometry={nodes.BEG_Light_3006.geometry} material={materials['Material.048']} position={[0.228, 6.349, 0.402]} />
    </group>
  )
}

useGLTF.preload("./signal-main-lunar-left.glb");
