import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Quaternion, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  RapierRigidBody,
  RigidBody,
  useFixedJoint,
} from "@react-three/rapier";

import { TrainProps } from "../common";
import { useGlobalContext, useSimpleJoint } from "../Hooks";

import { TrainEngine } from "./TrainEngine";
import { TrainCoach } from "./TrainCoach";

const engineDistance = 3.4;
const coachDistance = 3.56;
const jointDistance = 0.25;
const trainAcc = 0.25;
const localFrame = [0, 1, 0, 0] as Quaternion;

const calculatePositions = (position, isReverse, config, currentLine) => {
  const { engineDistance, coachDistance, jointDistance } = config;

  const shouldReverse =
    isReverse && (currentLine == "1-line" || currentLine == "2-line"|| currentLine == "3 line"||currentLine == "3-line"||currentLine == "4-line"|| currentLine == "4 line"|| currentLine == "5 line"|| currentLine == "6 line"|| currentLine == "5-line"|| currentLine == "6-line"|| currentLine == "7 line"|| currentLine == "7-line" || currentLine == "9-line"||currentLine == "10-line");

  const enginePosition = position.clone();

  const firstCoachOffset = shouldReverse
    ? -engineDistance - coachDistance - jointDistance
    : currentLine == "3-line" || currentLine == "16-line"
     ? -engineDistance - coachDistance - jointDistance
    : engineDistance + coachDistance + jointDistance;

  const secondCoachOffset = shouldReverse
    ? -coachDistance * 2 - jointDistance
    : currentLine == "3-line" || currentLine == "16-line"
    ? -coachDistance * 2 - jointDistance
    : coachDistance * 2 + jointDistance;

  const startOffset = shouldReverse ? -engineDistance : -engineDistance;
  const endOffset = shouldReverse ? coachDistance : coachDistance;

  const firstCoachPosition = enginePosition
    .clone()
    .add(new THREE.Vector3(firstCoachOffset, 0, 0));
  const secondCoachPosition = firstCoachPosition
    .clone()
    .add(new THREE.Vector3(secondCoachOffset, 0, 0));
  const startPosition = enginePosition
    .clone()
    .add(new THREE.Vector3(startOffset, 0, 0));
  const endPosition = secondCoachPosition
    .clone()
    .add(new THREE.Vector3(endOffset, 0, 0));

    // console.log("Line:", currentLine);
    // console.log("Engine Position:", enginePosition);
    // console.log("First Coach Offset:", firstCoachOffset);
    // console.log("Second Coach Offset:", secondCoachOffset);
  return {
    enginePosition,
    firstCoachPosition,
    secondCoachPosition,
    startPosition,
    endPosition,
  };
};

export function Train({ position }: TrainProps) {
  const { state, currentSpeed, maxSpeed, isReverse, currentLine } =
    useGlobalContext();
  const engineBody = useRef<RapierRigidBody>(null);
  const firstCoachBody = useRef<RapierRigidBody>(null);
  const secondCoachBody = useRef<RapierRigidBody>(null);
  const start = useRef<RapierRigidBody>(null);
  const end = useRef<RapierRigidBody>(null);

  // console.log("IS REVERS : ",isReverse);

  const trainRunning = "lr";

  const rotation = useMemo(() => {
    return isReverse && (currentLine == "1-line" || currentLine == "2-line"|| currentLine == "3 line"|| currentLine == "4 line"|| currentLine == "5 line"|| currentLine == "6 line"|| currentLine == "7 line"||currentLine == "9-line"||currentLine == "3-line")
      ? new THREE.Euler(0, Math.PI, 0)
      : currentLine == "1 line" || currentLine == "2 line"|| currentLine == "5-line"|| currentLine == "6-line"|| currentLine == "7-line"||currentLine == "10-line" ||currentLine == "3-line"||currentLine == "4-line"
      ? new THREE.Euler(0, Math.PI, 0)
      : new THREE.Euler(0, 0, 0);
  }, [isReverse, currentLine]);

  const config = { engineDistance, coachDistance, jointDistance };

  const {
    enginePosition,
    firstCoachPosition,
    secondCoachPosition,
    startPosition,
    endPosition,
  } = useMemo(
    () => calculatePositions(position, isReverse, config, currentLine),
    [position, isReverse, currentLine, config]
  );

  const targetSpeed = useMemo(() => {
    if (isReverse) {
      if (state == "forward")// || state == "forward-signal") 
      return -maxSpeed;
      else if (state == "reverse" )//|| state == "reverse-signal")
      return maxSpeed;
      else return 0.0;
    } else {
      if (state == "forward")// || state == "forward-signal") 
      return maxSpeed;
      else if (state == "reverse" )//|| state == "reverse-signal")
        return -maxSpeed;
      else return 0.0;
    }
  }, [state, maxSpeed]);

  useFixedJoint(start, engineBody, [
    [0, 0, 0],
    localFrame,
    [-engineDistance, 0, 0],
    localFrame,
  ]);

  useFixedJoint(end, secondCoachBody, [
    [0, 0, 0],
    localFrame,
    [coachDistance, 0, 0],
    localFrame,
  ]);

  useFrame(() => {

    if(state=='stop')
      {
        currentSpeed.current = 0;
        return;
      }
      let extraAcceleration = maxSpeed < 90 ? 3 : maxSpeed / 10

    // --- Acceleration ---
    if (currentSpeed.current < targetSpeed) {
      currentSpeed.current = Math.min(
        currentSpeed.current + trainAcc * extraAcceleration,
        targetSpeed
      );
      // currentSpeed.current = 130;
      return;
    }
    // --- Deceleration ---
    currentSpeed.current = Math.max(
      currentSpeed.current - trainAcc * extraAcceleration,
      targetSpeed
    );
  });

  const ballColliderPosition = useMemo(() => {
    return isReverse && (currentLine == "1-line" || currentLine == "2-line"|| currentLine == "3 line"|| currentLine == "4 line"|| currentLine == "5 line"|| currentLine == "6 line"|| currentLine == "7 line"||currentLine == "9-line" ||currentLine == "3-line"||currentLine == "4-line")
      ? { start: new THREE.Vector3(6, 0, 0), end: new THREE.Vector3(-6, 0, 0) }
      : currentLine == "1 line" || currentLine == "2 line"|| currentLine == "5-line"|| currentLine == "6-line"|| currentLine == "7-line"||currentLine == "10-line" ||currentLine == "3-line"||currentLine == "4-line"
      ? { start: new THREE.Vector3(6, 0, 0), end: new THREE.Vector3(-6, 0, 0) }
      : { start: new THREE.Vector3(0, 0, 0), end: new THREE.Vector3(0, 0, 0) };
  }, [isReverse, currentLine]);

  return (
    <>
      <RigidBody
        name="train-start"
        colliders={false}
        ref={start}
        position={startPosition}
        // rotation={rotation}
      >
        <BallCollider args={[0.1]} position={ballColliderPosition.start} />
      </RigidBody>
      <TrainEngine
        ref={engineBody}
        position={enginePosition}
        rotation={rotation}
      />
      <TrainCoach
        ref={firstCoachBody}
        position={firstCoachPosition}
        rotation={rotation}
      />
      <TrainCoach
        ref={secondCoachBody}
        position={secondCoachPosition}
        rotation={rotation}
      />
      <RigidBody
        name="train-end"
        colliders={false}
        ref={end}
        position={endPosition}
        // rotation={rotation}
      >
        <BallCollider args={[0.1]} position={ballColliderPosition.end} />
      </RigidBody>
    </>
  );
}
