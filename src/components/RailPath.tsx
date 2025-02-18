import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Detailed, Text } from "@react-three/drei";
import { CuboidCollider, IntersectionEnterPayload } from "@react-three/rapier";
import {
  getRailShape,
  RailPathImpl,
  RailPathProps,
  railSize,
  trackDetectorArgs,
  trackSize,
  trainMaxSpeed,
} from "../common";
import { useGlobalContext } from "../Hooks";
import { BatchedMesh } from "./BatchedMesh";
import {
  Instances as PoleInstances,
  Model as PoleModel,
} from "../models/ElectricPoleModel";

// const railColor = '#2e1e1e';
const railColor = "#4A2511"; // "#652A0E" //"#5E2c04"
const lineColor = "#1c1c1c";
const poleTextColor = "yellow";
const up = new THREE.Vector3(0, 1, 0);
const distanceColors = ["#660000", "#006600", "#000066"];
let poleTextDown = 0;
let poleTextUp = 740;
const alreadyHave = [];
const poleHave = [];

function fillMatrices(
  curve: THREE.Curve<THREE.Vector3>,
  multiplier: number = 1,
  base?: THREE.Quaternion
): THREE.Matrix4[] {
  const length = Math.ceil(curve.getLength() * multiplier);
  const points = curve.getSpacedPoints(length);
  const result = [] as THREE.Matrix4[];
  for (let ix = 0; ix < points.length; ix++) {
    const point = points[ix];

    const tangent = curve.getTangent(ix / length);
    const quaternion = new THREE.Quaternion()
      .setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.atan2(tangent.z, tangent.x)
      )
      .premultiply(
        base ?? new THREE.Quaternion().setFromAxisAngle(tangent, -Math.PI / 2)
      );

    const matrix = new THREE.Matrix4().makeTranslation(
      point.x,
      point.y,
      point.z
    );

    matrix.multiply(new THREE.Matrix4().makeRotationFromQuaternion(quaternion));

    result.push(matrix);
  }
  return result;
}

export const RailPath = forwardRef<RailPathImpl, RailPathProps>(
  (
    {
      start,
      end,
      rotation,
      trainSpeed,
      line,
      index,
      baseColor,
      normal,
      height,
      curvePath,
      trackAngle,
      trackRotation,
    },
    ref
  ) => {
    // console.log("Rotation : ", index, rotation);

    const { isDebug, setMaxSpeed } = useGlobalContext();
    const [isEnabled, setEnabled] = useState(false);
    // const shape = useLoader(SVGLoader, '/rail.svg');

    const shapeLeft = useMemo(() => {
      return getRailShape(-trackSize - railSize * 2, rotation);
    }, [rotation]);

    const shapeRight = useMemo(() => {
      return getRailShape(trackSize + railSize * 2, rotation);
    }, [rotation]);

    const rotatedShapeLeft = useMemo(() => {
      return getRailShape(-trackSize - railSize * 2, -90);
    }, []);

    const rotatedShapeRight = useMemo(() => {
      return getRailShape(trackSize + railSize * 2, -90);
    }, []);

    const currentColor = useMemo(() => {
      if (isDebug) {
        return index % 2 == 0 ? "#ffffff" : "#000000";
      }
      // return !isEnabled ? "#b1b1b1" : "#FF0000";
      return "#acacac"; // chnage color
    }, [isDebug, isEnabled, index]);

    const center = useMemo(() => {
      return start.clone().add(end).multiplyScalar(0.5);
    }, [start, end]);

    const trackCurveValue = {
      curveRight: [0.3, 1], // 0.3 //0.1
      curveLeft: [0.5, -1],
      straight: [0, -1],
      specialCurve1: [0.1, -1],
      specialCurve2: [-0.2, -1],
      normal: [0.5, -1],
    };

    const curve = useMemo(() => {
      const length = end.clone().sub(start);
      const radius = new THREE.Vector3(0, 0, length.z).multiplyScalar(
        trackCurveValue[curvePath][0]
      );

      if (curvePath == "curveRight" || curvePath == "curveLeft") {
        let x, y, z, center1, center2;

        if (curvePath == "curveRight") {
          if (trackAngle == "curve1") {
            x =
              start.clone().sub(center).x > 0
                ? start.clone().sub(center).x - 60
                : start.clone().sub(center).x + 300;
            y = end.clone().sub(center).y;
            z = end.clone().sub(center).z;
          } else if (trackAngle == "curve2") {
            x =
              end.clone().sub(center).x > 0
                ? end.clone().sub(center).x - 50
                : end.clone().sub(center).x + 60;
            y = start.clone().sub(center).y;
            z = start.clone().sub(center).z;
          } else {
            x =
              start.clone().sub(center).x > 0
                ? start.clone().sub(center).x - 8
                : start.clone().sub(center).x + 8;
            y = end.clone().sub(center).y;
            z = end.clone().sub(center).z;
          }
          center1 =
            trackAngle == "curve1"
              ? new THREE.Vector3(x + 80, y, z - 20)
              : trackAngle == "curve2"
              ? new THREE.Vector3(x, y, z)
              : end.clone().sub(center);
          center2 = new THREE.Vector3(x + 25, y, z);
        } else {
          if (trackAngle == "curve1") {
            x =
              end.clone().sub(center).x > 0
                ? end.clone().sub(center).x - 5
                : end.clone().sub(center).x - 120;
            y = start.clone().sub(center).y;
            z = start.clone().sub(center).z;
          } else if (trackAngle == "curve2") {
            x =
              end.clone().sub(center).x > 0
                ? end.clone().sub(center).x - 8
                : end.clone().sub(center).x - 110;
            y = start.clone().sub(center).y;
            z = start.clone().sub(center).z;
          } else {
            x =
              end.clone().sub(center).x > 0
                ? end.clone().sub(center).x - 8
                : end.clone().sub(center).x + 8;
            y = start.clone().sub(center).y;
            z = start.clone().sub(center).z;
          }
          center1 = new THREE.Vector3(x, y, z);
          center2 =
            trackAngle == "curve1"
              ? new THREE.Vector3(x, y, z + 270)
              : trackAngle == "curve2"
              ? new THREE.Vector3(x, y, z + 260)
              : end.clone().sub(center);
        }

        return new THREE.CubicBezierCurve3(
          start.clone().sub(center),
          center1.clone(),
          center2.clone(),
          end.clone().sub(center)
        );
      }

      return new THREE.CubicBezierCurve3(
        start.clone().sub(center),
        radius.clone().multiplyScalar(-1), // 1 , -4 curve path change angle
        radius,
        end.clone().sub(center)
      );
    }, [center, start, end]);

    const absCurve = useMemo(() => {
      const length = end.clone().sub(start);
      const radius = new THREE.Vector3(0, 0, length.z).multiplyScalar(
        trackCurveValue[curvePath][0]
      );
      if (curvePath == "curveRight" || curvePath == "curveLeft") {
        let x, y, z, center1, center2;

        if (curvePath == "curveRight") {
          if (trackAngle == "curve1") {
            x =
              start.clone().x > 0
                ? start.clone().x - 60
                : start.clone().x + 120;
            y = end.clone().y;
            z = end.clone().z;
          } else if (trackAngle == "curve2") {
            x = end.clone().x > 0 ? end.clone().x - 50 : end.clone().x + 60;
            y = start.clone().y;
            z = start.clone().z;
          } else {
            x = start.clone().x > 0 ? start.clone().x - 8 : start.clone().x + 8;
            y = end.clone().y;
            z = end.clone().z;
          }
          center1 =
            trackAngle == "curve1"
              ? new THREE.Vector3(x + 80, y, z - 20)
              : trackAngle == "curve2"
              ? new THREE.Vector3(x, y, z)
              : end.clone();
          center2 = new THREE.Vector3(x + 25, y, z);
        } else {
          if (trackAngle == "curve1") {
            x = end.clone().x > 0 ? end.clone().x - 8 : end.clone().x - 120;
            y = start.clone().y;
            z = start.clone().z;
          } else if (trackAngle == "curve2") {
            x = end.clone().x > 0 ? end.clone().x - 8 : end.clone().x - 110;
            y = start.clone().y;
            z = start.clone().z;
          } else {
            x = end.clone().x > 0 ? end.clone().x - 8 : end.clone().x + 8;
            y = start.clone().y;
            z = start.clone().z;
          }
          center1 = new THREE.Vector3(x, y, z);
          center2 =
            trackAngle == "curve1"
              ? new THREE.Vector3(x, y, z + 270)
              : trackAngle == "curve2"
              ? new THREE.Vector3(x, y, z + 260)
              : end.clone();
        }

        return new THREE.CubicBezierCurve3(start, center1, center2, end);
      }

      return new THREE.CubicBezierCurve3(
        start,
        center.clone().sub(radius),
        center.clone().add(radius),
        end
      );
    }, [center, start, end]);

    const polePoints = useMemo(() => {
      const base = new THREE.Quaternion().setFromAxisAngle(
        up,
        
        line % 2 == 0 ? 0 : -Math.PI
      );
      const matrices = fillMatrices(curve, 0.0001, base);
      return matrices
        .filter((_, ix) => ix % 2 !== line % 2)
        .map((m) => {
          const p = new THREE.Vector3();
          const q = new THREE.Quaternion();
          const s = new THREE.Vector3();
          m.decompose(p, q, s);
          // console.log("p m",p,m)
          return [p, new THREE.Euler().setFromQuaternion(q)] as [
            THREE.Vector3,
            THREE.Euler
          ];
        });
    }, [curve, line]);

    const options = useMemo(() => {
      return {
        depth: 1,
        steps: Math.floor(curve.getLength() + 1),
        extrudePath: curve,
      } as THREE.ExtrudeGeometryOptions;
    }, [curve]);

    const debrisGeom = useMemo(() => {
      const lodSegments = [35, 20, 5];
      const result = [] as THREE.PlaneGeometry[];
      for (const segments of lodSegments) {
        const geo = new THREE.PlaneGeometry(
          1.25,
          1.25,
          segments - 1,
          segments - 1
        );
        for (let x = 0; x < segments; x++) {
          for (let y = 0; y < segments; y++) {
            const ix = y * segments + x;
            geo.attributes.position.setZ(
              ix,
              Math.sin((y / segments) * Math.PI) * 0.08
            );
          }
        }
        result.push(geo);
      }
      return result;
    }, []);

    const concreteGeom = useMemo(() => {
      return new THREE.BoxGeometry(0.075, 0.75, 0.055);
    }, []);

    const lineGeometry = useMemo(() => {
      const shape = new THREE.Shape();
      shape.absarc(0, 0, 0.01, 0, Math.PI * 2, false);
      return new THREE.ExtrudeGeometry(shape, options);
    }, [options]);

    const trackMatrices = useMemo(() => {
      return fillMatrices(curve);
    }, [curve]);

    const concreteMatrices = useMemo(() => {
      return fillMatrices(curve, 2);
    }, [curve]);

    const objects = useMemo(() => {
      return new Set<string>();
    }, []);

    const collisionHandler = useCallback(
      (payload: IntersectionEnterPayload) => {
        const other = payload.other.rigidBodyObject.uuid;
        if (!objects.has(other)) {
          objects.add(other);
          if (objects.size === 1) {
            setMaxSpeed(trainSpeed || trainMaxSpeed);
          }
        } else {
          objects.delete(other);
        }
      },
      [objects, trainSpeed, setMaxSpeed]
    );

    useImperativeHandle(
      ref,
      () => ({
        enable: () => setEnabled(true),
        disable: () => setEnabled(false),
        isOccupied: () => objects.size > 0,
        getCurve: () => absCurve,
      }),
      [objects, absCurve]
    );

    // Merge left and right rail shapes into one geometry to reduce draw calls
    const mergedGeometry = useMemo(() => {
      const geometries = [
        new THREE.ExtrudeGeometry(shapeLeft, options),
        new THREE.ExtrudeGeometry(shapeRight, options),
      ];
      return mergeBufferGeometries(geometries);
    }, [shapeLeft, shapeRight, options]);
    return (
      <>
        {/* {isEnabled && (
          <>
            <CuboidCollider
              onIntersectionEnter={collisionHandler}
              sensor={true}
              args={trackDetectorArgs}
              position={start}
            />
            <CuboidCollider
              onIntersectionEnter={collisionHandler}
              sensor={true}
              args={trackDetectorArgs}
              position={end}
            />
          </>
        )} */}

        <>
          <group position={center} rotation={trackRotation}>
            <Detailed distances={[0, 200]}>
              <group>
                <mesh>
                  <bufferGeometry attach="geometry" {...mergedGeometry} />
                  <meshStandardMaterial color={railColor} />
                </mesh>
                {/* cables */}
                <mesh geometry={lineGeometry} position={[0, 2.15, 0]}>
                  <meshStandardMaterial color={lineColor} />
                </mesh>
                <mesh geometry={lineGeometry} position={[0, 1.87, 0]}>
                  <meshStandardMaterial color={lineColor} />
                </mesh>
              </group>
              <group />
            </Detailed>
            {/* gritty  */}
            <Detailed distances={[0, 30, 80]} position={[0, -0.1, 0]}>
              {debrisGeom.map((geo, ix) => (
                <BatchedMesh key={ix} geometry={geo} matrices={trackMatrices}>
                  <meshPhongMaterial
                    map={baseColor}
                    normalMap={normal}
                    displacementMap={height}
                    displacementScale={0.065}
                  />
                </BatchedMesh>
              ))}
            </Detailed>
            {isDebug && (
              <>
                <Detailed distances={[0, 30, 80]} position={[0, -0.125, 0]}>
                  {debrisGeom.map((geo, ix) => (
                    <mesh key={ix}>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshBasicMaterial color={distanceColors[ix]} />
                    </mesh>
                  ))}
                </Detailed>
                <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  {index}
                </Text>
              </>
            )}
            {/* Track blocks */}
            <BatchedMesh geometry={concreteGeom} matrices={concreteMatrices}>
              <meshStandardMaterial color={currentColor} />
            </BatchedMesh>
            {/* electric pole */}
            <Detailed distances={[0, 200]}>
              <PoleInstances>
                {polePoints.map(([pos, rot], ix) => {
                  const isWithinBounds =
                    (center.x >= -50 &&
                      center.x <= 40 &&
                      center.z >= -15 &&
                      center.z <= 15) ||
                    (center.x >= 250 &&
                      center.x <= 500 &&
                      center.z >= 0 &&
                      center.z <= 15);

                  if (isWithinBounds) {
                    return undefined;
                  }

                  return (
                    <PoleModel
                      key={ix}
                      position={[pos.x, pos.y, pos.z ]}
                      scale={[1, 1.3, 1]}
                      rotation={rot}
                    />
                  );
                })}
              </PoleInstances>
              <group />
            </Detailed>
            {polePoints.map(([pos, rot], ix) => {
              poleTextDown = poleTextDown > 45 ? 0 : poleTextDown + 1;
              poleTextUp = poleTextDown > 45 ? Math.min(poleTextUp + 1, 742): poleTextUp;
              // console.log("polUP",poleTextDown,poleTextUp);
              if (
                center.x >= -50 &&
                center.x <= 40 &&
                center.z >= -15 &&
                center.z <= 20
              ) {
                return;
              } else if (
                center.x >= 250 &&
                center.x <= 500 &&
                center.z >= 0 &&
                center.z <= 15
              ) {
                return;
              } else {
                return (
                  <group position={pos} rotation={rot}>
                    <Text
                      color={poleTextColor}
                      fontSize={0.05}
                      position={[0.05, 1.3, 0.89]}
                      rotation={[0, Math.PI / 2, 0]}
                    >
                      {poleTextUp}
                    </Text>
                    <Text
                      color={poleTextColor}
                      fontSize={0.05}
                      position={[0.05, 1.2, 0.89]}
                      rotation={[0, Math.PI / 2, 0]}
                    >
                      {poleTextDown}
                    </Text>
                  </group>
                );
              }
             
            })}

            <group />
          </group>
        </>
      </>
    );
  }
);
