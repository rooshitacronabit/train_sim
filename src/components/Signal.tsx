import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { CuboidCollider, IntersectionEnterPayload } from "@react-three/rapier";

import {
  railWayLunar,
  random,
  SignalProps,
  trackDetectorArgs,
  TrainState,
} from "../common";
import { useGlobalContext, useTimeout } from "../Hooks";
import { Model as HomeModel } from "../models/HomeSignalModel";
import { Model as MainStarterModel } from "../models/MainStarterSignalModel";
import { Model as StarterModel } from "../models/StarterSignalModel";
// import { Model as SignalMainModel } from "../models/signals/SignalMainModel";
import { Model as SignalMainModel } from "../models/signals/signalMain";
import { Model as SingalMainAnalogModel } from "../models/signals/SignalMainAnalogModel";
import { Model as SignalMainLunarLeftModel } from "../models/signals/SignalMainLunarLeftModel";
import { Model as SignalMainLunarRightModel } from "../models/signals/MainRightLunarModel";

import { Model as SignalMainLunar } from "../models/signals/SignalMainLunarModel";
import { Model as SignalStaterModel } from "../models/signals/SignalStaterModel";
// import { Model as SignalStaterLunarModel } from "../models/signals/SignalStaterLunarModel";
import { Model as SignalStaterLunarModel } from "../models/signals/SignalLunarWithTwoLight";
import { Model as SignalMainLunarRightTwoModel } from "../models/signals/SignalMainLunarRightTwo";

import { Model as StaterRightLunarModel } from "../models/signals/StaterRightLunarModel";
import { Model as StaterLeftLunarModel } from "../models/signals/StaterLeftLunarModel";
import { Model as SignalFourLightModel } from "../models/signals/SignalFourLight";
import { Model as SignalHomeFourLightLunarModel } from "../models/signals/SignalHomeFourLightLunar";
import { Model as SignalHomeFourLightLunarRightModel } from "../models/signals/SignalHomeFourLightLunarRight";

import { Model as SignalCounter } from "../models/signals/SignalCounter";


const onIntensity = 150;

const lunarOffMaterial = new THREE.MeshStandardMaterial({
  color: "#777777",
});
const lunarOnMaterial = new THREE.MeshStandardMaterial({
  emissive: "#ffffff",
  emissiveIntensity: 25,
});
const freeOffMaterial = new THREE.MeshStandardMaterial({
  color: "#777700",
});
const freeOnMaterial = new THREE.MeshStandardMaterial({
  emissive: "#ffff00",
  emissiveIntensity: onIntensity,
});
const stopOffMaterial = new THREE.MeshStandardMaterial({
  color: "#770000",
});
const stopOnMaterial = new THREE.MeshStandardMaterial({
  emissive: "#ff0000",
  emissiveIntensity: onIntensity,
});

const noStopOnMaterial = new THREE.MeshStandardMaterial({
  emissive: "#00ff00",
  emissiveIntensity: onIntensity,
});
const noStopOffMaterial = new THREE.MeshStandardMaterial({
  color: "#770000",
});

const signalSize = 0.8;

export function Signal({
  position,
  rotation,
  facing,
  label,
  type,
}: SignalProps) {
  const {
    currentSpeed,
    state,
    setState,
    currentLine,
    isReverse,
    popUpVisible,
    setPopUpVisible,
    setPopUpContent,
  } = useGlobalContext();
  const [isFree, setFree] = useState(false);
  const [digitalText, setDigitalText] = useState("black");

  const trainGo = useCallback(() => {
    setDigitalText("white");
    setFree(true);
    setPopUpVisible(false);
    // console.log("IS REVERSER : ", isReverse);
    if (isReverse) {
      setState((facing == "reverse" ? "forward" : "reverse") as TrainState);
    } else {
      setState(facing as TrainState);
      // setState((facing + "-signal") as TrainState);
    }
  }, [facing, setState, isReverse, popUpVisible]);

  const [start] = useTimeout(
    () => trainGo(),
    // () => random(5500, 7500)
    100 * 260
  );

  const [stop] = useTimeout(
    useCallback(() => {
      setFree(false);

      if (isReverse) {
        setState(facing == "reverse" ? "forward" : "reverse");
      } else {
        setState(facing);
      }
      // setState(facing);
    }, [facing, setState, isReverse]),
    () => 2000
  );

  const [letThrough] = useTimeout(
    useCallback(() => {
      setFree(true);
      console.log("IS REVERSER let : ", isReverse);

      if (isReverse) {
        setState(facing == "reverse" ? "forward" : "reverse");
      } else {
        setState(facing);
      }
      // setState(facing);
    }, [facing, setState, isReverse]),
    () => 5000
  );

  const SignalModel = useMemo(() => {
    // console.log("TYPE : ", type);

    switch (type) {
      case "home":
        return HomeModel;
      case "main-starter":
        return MainStarterModel;
      case "signal-main":
        return SignalMainModel;
      case "signal-main-lunar":
        return SignalMainLunar;

      case "signal-main-lunar-left":
        return SignalMainLunarLeftModel;
      case "signal-main-lunar-right":
        return SignalMainLunarRightModel;
      case "signal-main-analog":
        return SingalMainAnalogModel;
      case "signal-starter":
        return SignalStaterModel;
      case "signal-starter-lunar":
        return SignalStaterLunarModel;
      case "signal-starter-lunar-right":
        return StaterRightLunarModel;
      case "signal-starter-lunar-left":
        return StaterLeftLunarModel;
      case "signal-four-light":
        return SignalFourLightModel;
      case "signal-main-lunar-right-two-model":
        return SignalMainLunarRightTwoModel;
      case "signal-home-four-light-lunar-model":
        return SignalHomeFourLightLunarModel;
      case "signal-home-four-light-lunar-right-model":
        return SignalHomeFourLightLunarRightModel;
      case "signal-digital":
        return SignalCounter;

      default:
        return SignalStaterModel;
    }
  }, [type]);

  const SignalModelText = useMemo(() => {
    // console.log("TYPE : ", type);

    switch (type) {
      case "home":
        return new THREE.Vector3(0.15, 0.8, -0.05);
      case "main-starter":
        return new THREE.Vector3(0.06, 1.005, 0);
      case "signal-main":
        return new THREE.Vector3(0.06, 1.005, 0);
      case "signal-main-lunar":
        return new THREE.Vector3(0.16, 1.005, 0);
      case "signal-main-lunar-left":
        return new THREE.Vector3(0.16, 1.005, 0.01);
      case "signal-main-lunar-right":
        return new THREE.Vector3(0.16, 1.005, 0);
      case "signal-main-analog":
        return new THREE.Vector3(0.16, 1.005, 0.01);
      case "signal-starter":
        return new THREE.Vector3(0.052, 1.03, 0.01);
      case "signal-starter-lunar":
        return new THREE.Vector3(0.16, 1.005, 0);
      case "signal-starter-lunar-right":
        return new THREE.Vector3(0.16, 1.005, 0.01);
      case "signal-starter-lunar-left":
        return new THREE.Vector3(0.16, 1.005, 0.01);
      case "signal-four-light":
        return new THREE.Vector3(0.052, 1.005, 0);
      case "signal-digital":
        return new THREE.Vector3(0.06, 1.65, 0);
      case "signal-main-lunar-right-two-model":
        return new THREE.Vector3(0.15, 1.02, 0);
      case "signal-home-four-light-lunar-right-model":
        return new THREE.Vector3(0.15, 1.02, 0);

      default:
        return new THREE.Vector3(0.06, 1.005, 0);
    }
  }, [type]);

  const collisionHandler = useCallback(
    (payload: IntersectionEnterPayload) => {
      const direction = isReverse
        ? currentSpeed.current < 0
          ? "forward"
          : "reverse"
        : currentSpeed.current > 0
        ? "forward"
        : "reverse";

      const isSameDirection = isReverse
        ? direction !== facing
        : direction === facing;

      const name = payload.other.rigidBodyObject.name;

      const startName = direction == "forward" ? "train-start" : "train-end";
      const endName = direction == "forward" ? "train-end" : "train-start";

      if (!isSameDirection) {
        if (name === startName) {
          setState(direction as TrainState);
          return;
        }
        if (name === endName) {
          setState(direction);
        }
        return;
      }
      if (name === startName) {
        if (!isFree) {
          setPopUpVisible(true);
        
          setState("stop-signal");
          start();
        } else {
          setState(direction as TrainState);
        }
        return;
      }
      if (name === endName) {
        if (type === "home") {
          setFree(false);
          letThrough();
          return;
        }
        stop();
      }
    },
    [
      currentSpeed,
      facing,
      setState,
      isFree,
      start,
      type,
      stop,
      letThrough,
      isReverse,
    ]
  );

  const rotationChange = useMemo(() => {
    if (rotation) return rotation;
    return (facing === "reverse" ? [0, Math.PI, 0] : [0, 0, 0]) as [
      number,
      number,
      number
    ];
  }, [facing, rotation]);

  const scale = useMemo(() => {
    return (facing === "reverse" ? [1, 1, -1] : [1, 1, 1]) as [
      number,
      number,
      number
    ];
  }, [facing]);

  const signalRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!signalRef.current) return;

    const endSignal = ["S-2", "S-69", "S-99"];
    const lunarIndexes = railWayLunar[currentLine] || [];

    /** Utility function to update light materials */
    const updateLightMaterial = (
      lightName: string,
      conditionCallback: (index: number) => boolean,
      onMaterial: THREE.Material,
      offMaterial: THREE.Material,
      range: number = 1
    ) => {
      for (let i = 1; i <= range; i++) {
        const num = i.toString().padStart(2, "0");
        const light = signalRef.current.getObjectByName(
          `${lightName}${num}`
        ) as THREE.Mesh;

        if (light) {
          light.material = conditionCallback(i) ? onMaterial : offMaterial;
        }
      }
    };

    /** Update Main Signal Lights */
    const yellow = signalRef.current.getObjectByName(
      "YellowLight"
    ) as THREE.Mesh;
    const yellow01 = signalRef.current.getObjectByName(
      "YellowLight01"
    ) as THREE.Mesh;
    const red = signalRef.current.getObjectByName("RedLight") as THREE.Mesh;
    const green = signalRef.current.getObjectByName("GreenLight") as THREE.Mesh;

    if (yellow && !endSignal.includes(label)) {
      if (label == "S-38" || label == "S-40") {
        yellow.material = freeOffMaterial;
      } else {
        if (yellow01) {
          yellow01.material = isFree ? freeOnMaterial : freeOffMaterial;
          yellow.material = freeOffMaterial
        } else {
          yellow.material = isFree ? freeOnMaterial : freeOffMaterial;
        }
      }
    }
    if (red) {
      if (label == "S-38" || label == "S-40") {
        red.material = stopOnMaterial;
      } else {
        red.material = isFree ? stopOffMaterial : stopOnMaterial;
      }
    }
    if (green ) {
      green.material = isFree && endSignal.includes(label)? noStopOnMaterial : freeOffMaterial;
    }

    /** Update Yellow Lights (1-3) */
    updateLightMaterial(
      "YellowLight",
      () => isFree,
      freeOnMaterial,
      freeOffMaterial,
      3
    );

    /** Update White Lunar Lights (1-13) */
    updateLightMaterial(
      "WhiteLight",
      () => false,
      lunarOffMaterial,
      lunarOffMaterial,
      13
    );

    /** Update Lunar Lights based on Signal Type */
    const updateLunarLights = () => {
      updateLightMaterial(
        "WhiteLight",
        (i) => isFree && lunarIndexes.includes(i),
        lunarOnMaterial,
        lunarOffMaterial,
        13
      );
    };

    switch (type) {
      case "signal-main-lunar":
      case "signal-main-lunar-right":
      case "signal-main-lunar-left":
        if (type === "signal-main-lunar-left" && label === "S-35") break;
        if (
          type === "signal-main-lunar-right" &&
          label === "S-5" &&
          currentLine !== "SUNR-VRL"
        )
          break;
        updateLunarLights();
        break;

      // case "signal-main-lunar-right":
      //   if (currentLine === "SUNR-VRL" && label === "S-5") {
      //     console.log("TYPE : ", type);
      //     updateLunarLights();
      //   }
      //   break;

      default:
        break;
    }

    // No return here — ensures React sees `undefined`
  }, [
    currentSpeed,
    state,
    currentLine,
    isReverse,
    SignalModel,
    MainStarterModel,
    SignalMainModel,
    SignalMainLunar,
    SignalMainLunarLeftModel,
    SignalMainLunarRightModel,
    SingalMainAnalogModel,
    SignalStaterModel,
    SignalStaterLunarModel,
    StaterRightLunarModel,
  ]);

  return (
    <group position={position} rotation={rotationChange}>
      <group ref={signalRef} position={[0, 0, signalSize]}>
        {}
        {type !== "signal-digital" && (
          <Text
            color="white"
            fontSize={0.05}
            // position={[0.06, 1.005, 0]}
            position={SignalModelText}
            rotation={[0, Math.PI / 2, 0]}
          >
            {label}
          </Text>
        )}
        {type === "signal-digital" && (
          <Text
            color={digitalText}
            fontSize={0.1}
            // position={[0.06, 1.005, 0]}
            position={SignalModelText}
            rotation={[0, Math.PI / 2, 0]}
          >
            {/* {digitalText} */}
            {currentLine.charAt(0) || ""}
          </Text>
        )}
        <group scale={scale}>
          <SignalModel scale={0.25} />
        </group>

        {/* <SignalMainModel scale={2} position={[0, 0,0]}/> */}
      </group>
      <CuboidCollider
        onIntersectionEnter={collisionHandler}
        sensor={true}
        args={trackDetectorArgs}
        position={[8, 0, 0]}
        // rotation={coliderPostionAndRotation.rotation}
      />
    </group>
  );
}
