import * as THREE from "three";
import { forwardRef, useMemo, useRef } from "react";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";

import { GlobalContext, TrainProps } from "../common";
import { useGlobalContext, useInternalRef, useTrainPart } from "../Hooks";
import { Wheels } from "./Wheels";
import { Camera } from "./Camera";
import { Model } from "../models/TrainEngineModel";
// import { Model } from "../models/Train";

const engineWheelDistance = 2.0;

export const TrainEngine = forwardRef<RapierRigidBody, TrainProps>(
  ({ position, children, ...props }, ref) => {
    const { isReverse, currentLine } = useGlobalContext();
    const target = useRef<THREE.Object3D>();

    const positions = useMemo(() => {
      return isReverse && (currentLine == "1-line" || currentLine == "2-line")
        ? [
            new THREE.Vector3(3.2, 0.325, -0.23),
            new THREE.Vector3(-15, 2, 0),
            new THREE.Vector3(-2, 3, 5),
            new THREE.Vector3(-1, 3, 0),
          ]
        : currentLine == "1 line" || currentLine == "2 line"  || currentLine == "1_line" || currentLine == "2_line"|| currentLine == "5 line" || currentLine == "6 line" || currentLine == "7 line" 
        ? [
            new THREE.Vector3(3.2, 0.325, -0.23),
            new THREE.Vector3(-15, 2, 0),
            new THREE.Vector3(-2, 3, 5),
            new THREE.Vector3(-1, 3, 0),
          ]
        : [
            new THREE.Vector3(-3.15, 0.345, 0.2),
            new THREE.Vector3(15, 2, 0),
            new THREE.Vector3(0, 5, 10),
            new THREE.Vector3(-1, 3, 0),
          ];
      // return  [
      //         new THREE.Vector3(-3.15, 0.345, 0.2),
      //         new THREE.Vector3(15, 2, 0),
      //         new THREE.Vector3(0, 5, 10),
      //         new THREE.Vector3(-1, 3, 0),
      //       ];
    }, [isReverse, currentLine]);

    const dollyDistance = 0.7;

    const frontWheelPos = useMemo(() => {
      return new THREE.Vector3(-engineWheelDistance, -dollyDistance, 0).add(
        position
      );
    }, [position, dollyDistance]);

    const rearWheelPos = useMemo(() => {
      return new THREE.Vector3(engineWheelDistance, -dollyDistance, 0).add(
        position
      );
    }, [position, dollyDistance]);

    const [bodyRef, bodyCb] = useInternalRef<RapierRigidBody>(ref);
    const [frontWheels, rearWheels] = useTrainPart(
      bodyRef,
      engineWheelDistance,
      dollyDistance
    );

    const targetObjectposition = useMemo(() => {
      return isReverse && (currentLine == "1-line" || currentLine == "2-line")
        ? new THREE.Vector3(30, -2, 0)
        : currentLine == "1 line" || currentLine == "2 line"  || currentLine == "1_line" || currentLine == "2_line"|| currentLine == "5 line" || currentLine == "6 line" || currentLine == "7 line" 
        ? new THREE.Vector3(30, -2, 0)
        : new THREE.Vector3(-15, -2, 0);
    }, [isReverse, currentLine]);

    return (
      <>
        <RigidBody
          name="engine"
          canSleep={false}
          colliders={false}
          ref={bodyCb}
          position={[position.x + 20, position.y, position.z]}
          {...props}
        >
          <CuboidCollider args={[engineWheelDistance, 0.1, 0.6]} />
          <Model
            scale={55}
            position={[0, -0.65, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <object3D position={targetObjectposition} ref={target} />
          {positions.map((position, index) => (
            <Camera
              index={index + 1}
              fixed={true}
              distance={0.5}
              position={position}
              targetRef={target}
              key={index}
            />
          ))}
        </RigidBody>
        <Wheels ref={frontWheels} position={frontWheelPos} />
        <Wheels ref={rearWheels} position={rearWheelPos} />
      </>
    );
  }
);
