import * as THREE from "three";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { CuboidCollider, IntersectionEnterPayload } from "@react-three/rapier";

import { railWayLines, trackDetectorArgs, TrackEndProps } from "../common";
import { useGlobalContext } from "../Hooks";

export function TrackEnd({ position, facing }: TrackEndProps) {
  const {
    currentSpeed,
    state,
    setState,
    setTrackEnd,
    currentLine,
    railPaths,
    isReverse,
  } = useGlobalContext();

  const selectedPathIndex = useMemo(() => {
    if (!railWayLines[currentLine]) return undefined;
    return isReverse
      ? railWayLines[currentLine][1]
      : railWayLines[currentLine][railWayLines[currentLine].length - 1];
  }, [isReverse, railWayLines, currentLine]);

  const getlastPathPoints = useMemo(() => {
    const curve = railPaths[selectedPathIndex]?.current?.getCurve();
    return curve ? curve.getPoints(1)?.[0] : new THREE.Vector3(0, 0, 0);
  }, [railPaths, selectedPathIndex]);

  // console.log("Rail way line ",selectedPathIndex);
  // console.log("Rail path : ",getlastPathPoints);

  const direction = useMemo(
    () => (currentSpeed.current > 0 ? "forward" : "reverse"),
    [currentSpeed.current]
  );

  const collisionHandler = useCallback(
    (payload: IntersectionEnterPayload) => {
      if (direction === facing) {
        if (state !== "stop") {
          setState("stop");
          setTrackEnd(facing);
          toast("Train has reached the end of the track", { type: "info" });
        }
      } else {
        setTrackEnd(null);
      }
    },
    [direction, facing, state, setState, setTrackEnd]
  );

  return (
    <CuboidCollider
      onIntersectionEnter={collisionHandler}
      onIntersectionExit={collisionHandler}
      sensor={true}
      args={trackDetectorArgs}
      position={getlastPathPoints}
    />
  );
}
