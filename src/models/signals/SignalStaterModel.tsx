import * as THREE from 'three'
import React from 'react'
import { useGLTF, } from '@react-three/drei'
import { GLTF, GLTFLoader } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    stand001: THREE.Mesh
    Stairs001: THREE.Mesh
    st_1003: THREE.Mesh
    SS_3004: THREE.Mesh
    SS_2004: THREE.Mesh
    SS_1004: THREE.Mesh
    Mesh125: THREE.Mesh
    Mesh125_1: THREE.Mesh
    nut_4001: THREE.Mesh
    nut_3001: THREE.Mesh
    nut_2001: THREE.Mesh
    nut_1001: THREE.Mesh
    hs_18006: THREE.Mesh
    FS_3001: THREE.Mesh
    FS_2004: THREE.Mesh
    FS_1005: THREE.Mesh
    BEG_Light_1005: THREE.Mesh
    YellowLight: THREE.Mesh
    RedLight: THREE.Mesh
    board007: THREE.Mesh
    cube006: THREE.Mesh
    hs_17006: THREE.Mesh
    hs_16006: THREE.Mesh
    Light_1005: THREE.Mesh
  }
  materials: {
    ['Material.055']: THREE.MeshStandardMaterial
    ['Material.056']: THREE.MeshStandardMaterial
    ['Material.059']: THREE.MeshStandardMaterial
    ['Material.116']: THREE.MeshBasicMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('./signal-starter.glb') as GLTFResult
  
  // console.log("NODES : ",nodes);
  
   if(Object.keys(nodes).includes("YELLOW__light_048")){
    nodes['YellowLight'] = nodes["YELLOW__light_048"];
   } 
   if(Object.keys(nodes).includes("RED_light_049")){
    nodes['RedLight'] = nodes["RED_light_049"];
   } 
   
   return (
    <group {...props} dispose={null}>
      <mesh name="stand001" geometry={nodes.stand001.geometry} material={materials['Material.055']} position={[0, 0.297, 0.014]} scale={[1.08, 1, 1.109]} />
      <mesh name="Stairs001" geometry={nodes.Stairs001.geometry} material={materials['Material.056']} position={[-0.709, 3.35, 0.033]} scale={[1, 0.916, 1]} />
      <mesh name="st_1003" geometry={nodes.st_1003.geometry} material={materials['Material.056']} position={[0.048, 4.218, 0.032]} />
      <mesh name="SS_3004" geometry={nodes.SS_3004.geometry} material={materials['Material.056']} position={[-0.111, 4.306, 0.032]} />
      <mesh name="SS_2004" geometry={nodes.SS_2004.geometry} material={materials['Material.056']} position={[0.052, 4.306, 0.18]} />
      <mesh name="SS_1004" geometry={nodes.SS_1004.geometry} material={materials['Material.056']} position={[0.052, 4.306, -0.103]} />
      <group name="pole001" position={[0.007, 2.385, 0.021]} scale={[1, 1.043, 1]}>
        <mesh name="Mesh125" geometry={nodes.Mesh125.geometry} material={materials['Material.059']} />
        <mesh name="Mesh125_1" geometry={nodes.Mesh125_1.geometry} material={materials['Material.056']} />
      </group>
      <mesh name="nut_4001" geometry={nodes.nut_4001.geometry} material={materials['Material.056']} position={[-0.103, 0.649, -0.07]} />
      <mesh name="nut_3001" geometry={nodes.nut_3001.geometry} material={materials['Material.056']} position={[-0.103, 0.649, 0.136]} />
      <mesh name="nut_2001" geometry={nodes.nut_2001.geometry} material={materials['Material.056']} position={[0.103, 0.649, 0.136]} />
      <mesh name="nut_1001" geometry={nodes.nut_1001.geometry} material={materials['Material.056']} position={[0.103, 0.649, -0.07]} />
      <mesh name="hs_18006" geometry={nodes.hs_18006.geometry} material={materials['Material.056']} position={[0.202, 4.092, 0.036]} />
      <mesh name="FS_3001" geometry={nodes.FS_3001.geometry} material={materials['Material.056']} position={[-0.009, 3.554, 0.031]} />
      <mesh name="FS_2004" geometry={nodes.FS_2004.geometry} material={materials['Material.056']} position={[0, 2.26, 0.033]} />
      <mesh name="FS_1005" geometry={nodes.FS_1005.geometry} material={materials['Material.056']} position={[0.042, 1.615, 0.033]} />
      <mesh name="BEG_Light_1005" geometry={nodes.BEG_Light_1005.geometry} material={materials['Material.056']} position={[0.08, 4.856, 0.039]} rotation={[Math.PI / 2, 0, 0]} scale={0.231} />
      <mesh name="YellowLight" geometry={nodes.YellowLight.geometry} material={materials['Material.116']} position={[0.097, 5.292, 0.016]} rotation={[-0.001, 0.01, 1.551]} scale={[0.238, 0.111, 0.238]} />
      <mesh name="RedLight" geometry={nodes.RedLight.geometry} material={materials['Material.116']} position={[0.097, 4.963, 0.019]} rotation={[-0.001, 0.01, 1.551]} scale={[0.238, 0.111, 0.238]} />
      <mesh name="board007" geometry={nodes.board007.geometry} material={materials['Material.056']} position={[0.329, 2.321, 0.033]} />
      <mesh name="cube006" geometry={nodes.cube006.geometry} material={materials['Material.056']} position={[0.408, 2.63, 0.033]} />
      <mesh name="hs_17006" geometry={nodes.hs_17006.geometry} material={materials['Material.056']} position={[0.547, 2.982, 0.033]} />
      <mesh name="hs_16006" geometry={nodes.hs_16006.geometry} material={materials['Material.056']} position={[0.509, 2.364, 0.033]} />
      <mesh name="Light_1005" geometry={nodes.Light_1005.geometry} material={materials['Material.056']} position={[0.166, 1.761, 0.034]} />
    </group>
  )
  }
  
  useGLTF.preload('./signal-starter.glb')