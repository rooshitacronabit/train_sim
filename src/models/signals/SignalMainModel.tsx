import * as THREE from 'three'
import React from 'react'
import { useGLTF, } from '@react-three/drei'
import { GLTF, GLTFLoader } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
      YELLOW_light_046: THREE.Mesh
      RED_light_047: THREE.Mesh
      _GREEN_light_045: THREE.Mesh
      BEG_Light_2012: THREE.Mesh
      board010: THREE.Mesh
      cube005: THREE.Mesh
      FS_2006: THREE.Mesh
      FS_3007: THREE.Mesh
      hs_16005: THREE.Mesh
      hs_17005: THREE.Mesh
      hs_18005: THREE.Mesh
      Lights_1004: THREE.Mesh
      nut_1007: THREE.Mesh
      nut_2007: THREE.Mesh
      nut_3007: THREE.Mesh
      nut_4007: THREE.Mesh
      pipe_1002: THREE.Mesh
      pipe_2002: THREE.Mesh
      pipe_3002: THREE.Mesh
      Mesh085: THREE.Mesh
      Mesh085_1: THREE.Mesh
      SS_1008: THREE.Mesh
      SS_2008: THREE.Mesh
      SS_3008: THREE.Mesh
      st_1007: THREE.Mesh
      Stairs007: THREE.Mesh
      stand007: THREE.Mesh
      RedLight : THREE.Mesh
      GreenLight : THREE.Mesh
      YellowLight : THREE.Mesh
    }
    materials: {
     "Material.040": THREE.MeshStandardMaterial
     "Material.042": THREE.MeshStandardMaterial
     "Material.043": THREE.MeshStandardMaterial
     "Material.044": THREE.MeshStandardMaterial
     "Material.045": THREE.MeshStandardMaterial
     "Material.046": THREE.MeshStandardMaterial
     "Material.064": THREE.MeshStandardMaterial
     "Material.113": THREE.MeshStandardMaterial
     "Material.114": THREE.MeshStandardMaterial
     "Material.115": THREE.MeshStandardMaterial
    }
    animations: GLTFAction[]
  }

export function Model(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('./signal-main.glb') as GLTFResult
    // console.log("signalmain model : ",nodes,materials);

    // console.log(Object.keys(nodes));
    if(Object.keys(nodes).includes("YELLOW_light_046")){
     nodes['YellowLight'] = nodes["YELLOW_light_046"];
    } 
    if(Object.keys(nodes).includes("RED_light_047")){
     nodes['RedLight'] = nodes["RED_light_047"];
    } 
    if(Object.keys(nodes).includes("_GREEN_light_045")){
      nodes['GreenLight'] = nodes["_GREEN_light_045"];
     }
    
    return (
      <group {...props} dispose={null}>
        <mesh name="GreenLight" geometry={nodes.GreenLight?.geometry} material={materials["Material.113"]} position={[0.142, 5.51, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
        <mesh name="YellowLight" geometry={nodes.YellowLight.geometry} material={materials["Material.114"]} position={[0.142, 5.126, -0.007]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
        <mesh name="RedLight" geometry={nodes.RedLight?.geometry} material={materials["Material.114"]} position={[0.145, 4.772, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
        {/* <mesh name="YELLOW_light_046" geometry={nodes.YELLOW_light_046.geometry} material={materials["Material.114"]} position={[0.142, 5.126, -0.007]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
        <mesh name="RED_light_047" geometry={nodes.RED_light_047?.geometry} material={materials["Material.114"]} position={[0.145, 4.772, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} />
        <mesh name="_GREEN_light_045" geometry={nodes._GREEN_light_045?.geometry} material={materials["Material.113"]} position={[0.142, 5.51, 0.004]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 0.04, 0.071]} /> */}
        <mesh name="BEG_Light_2012" geometry={nodes.BEG_Light_2012.geometry} material={materials["Material.064"]} position={[0.215, 5.144, -1]} />
        <mesh name="board010" geometry={nodes.board010.geometry} material={materials["Material.042"]} position={[0.359, 2.311, -0.011]} />
        <mesh name="cube005" geometry={nodes.cube005.geometry} material={materials["Material.042"]} position={[0.448, 2.651, -0.01]} />
        <mesh name="FS_2006" geometry={nodes.FS_2006.geometry} material={materials["Material.042"]} position={[0, 2.225, -0.01]} />
        <mesh name="FS_3007" geometry={nodes.FS_3007.geometry} material={materials["Material.043"]} position={[-0.01, 3.393, 0.01]} />
        <mesh name="hs_16005" geometry={nodes.hs_16005.geometry} material={materials["Material.040"]} position={[0.559, 2.35, -0.01]} />
        <mesh name="hs_17005" geometry={nodes.hs_17005.geometry} material={materials["Material.040"]} position={[0.601, 3.038, -0.01]} />
        <mesh name="hs_18005" geometry={nodes.hs_18005.geometry} material={materials["Material.040"]} position={[0.204, 4.008, 0.008]} />
        <mesh name="Lights_1004" geometry={nodes.Lights_1004.geometry} material={materials["Material.043"]} position={[0.063, 4.606, 0.04]} />
        <mesh name="nut_1007" geometry={nodes.nut_1007.geometry} material={materials["Material.043"]} position={[0.12, 0.694, -0.111]} />
        <mesh name="nut_2007" geometry={nodes.nut_2007.geometry} material={materials["Material.043"]} position={[0.12, 0.694, 0.115]} />
        <mesh name="nut_3007" geometry={nodes.nut_3007.geometry} material={materials["Material.043"]} position={[-0.107, 0.694, 0.115]} />
        <mesh name="nut_4007" geometry={nodes.nut_4007.geometry} material={materials["Material.044"]} position={[-0.107, 0.694, -0.111]} />
        <mesh name="pipe_1002" geometry={nodes.pipe_1002.geometry} material={materials["Material.042"]} position={[0.628, 2.871, -0.011]} />
        <mesh name="pipe_2002" geometry={nodes.pipe_2002.geometry} material={materials["Material.042"]} position={[0.628, 2.739, -0.076]} />
        <mesh name="pipe_3002" geometry={nodes.pipe_3002.geometry} material={materials["Material.042"]} position={[0.628, 2.739, 0.054]} />
        <group name="pole003" position={[0.007, 2.41, 0.001]}>
          <mesh name="Mesh085" geometry={nodes.Mesh085.geometry} material={materials["Material.043"]} />
          <mesh name="Mesh085_1" geometry={nodes.Mesh085_1.geometry} material={materials["Material.045"]} />
        </group>
        <mesh name="SS_1008" geometry={nodes.SS_1008.geometry} material={materials["Material.043"]} position={[0.054, 4.222, -0.133]} />
        <mesh name="SS_2008" geometry={nodes.SS_2008.geometry} material={materials["Material.043"]} position={[0.054, 4.222, 0.149]} />
        <mesh name="SS_3008" geometry={nodes.SS_3008.geometry} material={materials["Material.043"]} position={[-0.109, 4.222, 0.002]} />
        <mesh name="st_1007" geometry={nodes.st_1007.geometry} material={materials["Material.043"]} position={[0.05, 4.134, 0.002]} />
        <mesh name="Stairs007" geometry={nodes.Stairs007.geometry} material={materials["Material.043"]} position={[-0.787, 3.128, 0.009]} />
        <mesh name="stand007" geometry={nodes.stand007.geometry} material={materials["Material.046"]} position={[0, 0.326, 0.008]} />
      </group>
    )
  }
  
  useGLTF.preload('./signal-main.glb')