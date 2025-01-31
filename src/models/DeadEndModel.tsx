import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Bevel_Support_L: THREE.Mesh;
    Bevel_Support_R: THREE.Mesh;
    Las_Bar: THREE.Mesh;
    Mid_Bar: THREE.Mesh;
    Top_Bar: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./dead-end.glb") as GLTFResult;
  // console.log("DEAD END : ", nodes, materials);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Bevel_Support_L.geometry}
        material={materials["lambert1"]}
        // position={[-22.041, 0, -1.097]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      
      />
      <mesh
        geometry={nodes.Bevel_Support_R.geometry}
        material={materials["lambert1"]}
        // position={[-22.041, 0, -1.097]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      
      />{" "}
      <mesh
        geometry={nodes.Las_Bar.geometry}
        material={materials["lambert1"]}
        // position={[-22.041, 0, -1.097]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      
      />{" "}
      <mesh
        geometry={nodes.Mid_Bar.geometry}
        material={materials["lambert1"]}
        // position={[-22.041, 0, -1.097]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      
      />{" "}
      <mesh
        geometry={nodes.Top_Bar.geometry}
        material={materials["lambert1"]}
        // position={[-22.041, 0, -1.097]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      
      />
    </group>
  );
}

useGLTF.preload("./dead-end.glb");
