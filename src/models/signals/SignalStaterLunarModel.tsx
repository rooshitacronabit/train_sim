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
    const { nodes, materials } = useGLTF('./signal-starter-lunar.glb') as GLTFResult
   
    return (
      <group {...props} dispose={null}>
        {/* Generate Meshes Dynamically */}
        {Object.keys(nodes).map((nodeName, index) => {
          const node = nodes[nodeName];
          if (node.isMesh) {
            const materialKey = Object.keys(materials).find((key) =>
              node.material && node.material.name ? key === node.material.name : false
            );
  
            return (
              <mesh
                key={index}
                name={nodeName}
                geometry={node.geometry}
                material={materialKey ? materials[materialKey] : undefined}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
              />
            );
          }
          return null;
        })}
      </group>
    );
  }
  
  useGLTF.preload('./signal-starter-lunar.glb')