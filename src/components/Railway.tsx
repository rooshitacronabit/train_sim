import * as THREE from "three";
import { createRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { CatmullRomLine, Detailed } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import {
  trackspace,
  RailPathImpl,
  RailPathProps,
  railSegmentLength,
  SignalProps,
  TrackEndProps,
} from "../common";
import { useGlobalContext } from "../Hooks";
import { RailPath } from "./RailPath";
import { Signal } from "./Signal";
import { TrackEnd } from "./TrackEnd";
import { Model as DeadEndModel } from "../models/DeadEndModel";
import { GrassDrySingle } from "../components/landscape/GrassDrySingle";
import { Model as GrassModel } from "../models/grassmodel/Dry-Grass-Model";
import { Model as MultipleGrassModel } from "../models/grassmodel/MultipleGrass";
import {
  signalsPoints,
  texturePoints,
  trackPoints,
  excludedSignalsForGrassDrySingle,
  grassDrySinglePositionOverrides,
} from "../trackPoints";
import {
  Instances as PoleInstances,
  Model as PoleModel,
} from "../models/ElectricPoleModel";
import { Model as StationPole } from "../models/electricPole/NewStationPoleModel";
import { Model as PoleNewModel4 } from "../models/electricPole/newelectricBlend2";
import { Model as StationPole1 } from "../models/electricPole/StationPoleModel";
// import { Model as PoleNewModel4 } from "../models/electricPole/SquareElectricPole4";

export function Railway() {
  const { railPaths, setRailPaths, path } = useGlobalContext();
  const [baseColor, normal, height] = useLoader(THREE.TextureLoader, [
    "./debris/BaseColor.jpg",
    "./terrain/track-texture.png",
    "./debris/Normal.jpg",
    "./debris/Height.png",
  ]);
  // const [baseColor, normal, height] = useLoader(THREE.TextureLoader, [
  //   "./debris/kapchi2_1024.jpg",
  //   "./debris/Concrete018_1K-PNG_NormalDX.png",
  //   // "./concrete/Concrete018_1K-PNG_Roughness.png",
  //   // "./debris/Concrete018.png",
  // ]);

  const TrackTexture = ({ position, scale, rotation }) => {
    // Load the texture using useLoader
    const texture = useLoader(
      THREE.TextureLoader,
      "./terrain/new-texture-track2.png"
    );
    // const texture = useLoader(THREE.TextureLoader, "./terrain/track-texture.png");

    return (
      <mesh rotation={rotation} position={position} scale={scale}>
        {/* Add geometry (e.g., PlaneGeometry) */}
        <planeGeometry args={[5, 5]} />
        {/* Add material and apply the texture */}
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  };

  const trackWidth = 25;

  const paths = useMemo(() => {
    const res: RailPathProps[] = [];

    // Encapsulated reusable addLine function
    const addLine = ({
      face = "forward",
      start,
      end,
      jointStart,
      jointEnd,
      joint,
      line,
      curvePath = "normal",
      trackLength = railSegmentLength,
      rotation = 0,
      trackAngle,
      trackRotation = [0, 0, 0],
    }: {
      face?: string;
      start: number;
      end: number;
      jointStart: number;
      jointEnd: number;
      joint: number[];
      line: number;
      curvePath?: string;
      trackLength?: number;
      rotation?: number;
      trackAngle?: string;
      trackRotation?: any;
    }) => {
      if (face == "reverse") {
        for (let i = start; i < end; i++) {
          const sz = i === jointStart ? joint[0] : joint[1];
          const ez = i === jointEnd ? joint[2] : joint[3];
          res.push({
            start: new THREE.Vector3(i * trackLength, 0, sz),
            end: new THREE.Vector3(
              trackAngle != undefined && curvePath == "curveLeft"
                ? i * trackLength
                : (i + 1) * trackLength,
              // (i + 1) * trackLength,
              0,
              ez
            ),
            line,
            rotation: sz !== ez ? 90 : 0,
            curvePath,
            trackAngle,
            trackRotation,
          });
        }
      } else {
        for (let i = start; i > end; i--) {
          const sz = i === jointStart ? joint[0] : joint[1];
          const ez = i === jointEnd ? joint[2] : joint[3];
          res.push({
            start: new THREE.Vector3(i * trackLength, 0, sz),
            end: new THREE.Vector3(
              trackAngle != undefined && curvePath == "curveLeft"
                ? i * trackLength
                : (i - 1) * trackLength,
              0,
              ez
            ),
            line,
            rotation: sz !== ez ? 90 : 0,
            curvePath,
            trackAngle,
            trackRotation,
          });
        }
      }
    };

    // Generate paths based on configurations
    trackPoints.forEach((config) => addLine(config));

    // Add refs for each path
    const refs = res.map((props, ix) => {
      // console.log("Track couunt : ",res.length,ix,props);
      props.index = ix;
      return createRef<RailPathImpl>();
    });

    setRailPaths?.(refs);
    return res;
  }, [setRailPaths, railSegmentLength, trackspace]);

  const signals = useMemo(() => {
    // const res: SignalProps[] = [];
    const res = [];

    signalsPoints.map((signal) => {
      res.push({
        position: new THREE.Vector3(signal.x, signal.y, signal.z),
        facing: signal.facing,
        label: signal.label,
        type: signal.type,
        rotation: signal.rotation,
      });
    });

    return res;
  }, []);

  const trackEnds = useMemo(() => {
    const res: TrackEndProps[] = [];
    res.push({
      // position: new THREE.Vector3(5.75 * railSegmentLength, 0, 0),
      facing: "reverse",
    });
    res.push({
      // position: new THREE.Vector3(-5.75 * railSegmentLength, 0, 0),
      facing: "forward",
    });
    return res;
  }, []);

  const deadEndPotion = useMemo(() => {
    return [
      {
        position: new THREE.Vector3(0, -0.1, -5.5),
        rotation: new THREE.Euler(),
      },
      {
        position: new THREE.Vector3(0, -0.1, -3.5),
        rotation: new THREE.Euler(),
      },
      {
        position: new THREE.Vector3(60, -0.1, 7.5),
        rotation: new THREE.Euler(0, Math.PI, 0),
      },
      {
        position: new THREE.Vector3(90, -0.1, 18),
        rotation: new THREE.Euler(0, Math.PI, 0),
      },
      {
        position: new THREE.Vector3(-88, -0.1, 19),
        rotation: new THREE.Euler(0, 0, 0),
      },
      {
        position: new THREE.Vector3(-30, -0.1, 22),
        rotation: new THREE.Euler(),
      },
      {
        position: new THREE.Vector3(330, -0.1, 4),
        rotation: new THREE.Euler(),
      },
      {
        position: new THREE.Vector3(480, -0.1, 4),
        rotation: new THREE.Euler(0, Math.PI, 0),
      },
    ];
  }, []);

  const tec = useMemo(() => {
    // p1a-1b
    for (let i = 0; i <= 40; i += 5) {
      texturePoints.push({
        position: new THREE.Vector3(i, -0.1, -4),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
        scale: new THREE.Vector3(1, 1, 1),
      });
    }
    // p1-2
    for (let i = -60; i <= 30; i += 5) {
      texturePoints.push({
        position: new THREE.Vector3(i, -0.1, 1.5),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
        scale: new THREE.Vector3(1, 1, 1),
      });
    }
    // p3-4
    for (let i = -60; i <= 60; i += 5) {
      texturePoints.push({
        position: new THREE.Vector3(i, -0.1, 9),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
        scale: new THREE.Vector3(1, 1, 1),
      });
    }
    // p5
    for (let i = -60; i <= 90; i += 5) {
      if (i >= -20 && i <= 40) {
        texturePoints.push({
          position: new THREE.Vector3(i, -0.1, 16),
          rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
          scale: new THREE.Vector3(1, 2, 1),
        });
      } else {
        texturePoints.push({
          position: new THREE.Vector3(i, -0.1, 16),
          rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
          scale: new THREE.Vector3(1, 1, 1),
        });
      }
    }

    // Happa
    for (let i = 80; i <= 1000; i += 5) {
      texturePoints.push({
        position: new THREE.Vector3(i, -0.1, 11.5),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2),
        scale: new THREE.Vector3(1.5, 1, 1),
      });
    }

    // Sunr
    const numEntries = 43;
    const startX = -230;
    const startZ = 149.1;
    const increment = 6.8;
    for (let i = 0; i < numEntries; i++) {
      texturePoints.push({
        position: new THREE.Vector3(
          startX - i * 7.3,
          -0.1,
          startZ + i * increment
        ),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI / 2 + 0.75),
        scale: new THREE.Vector3(2, 2, 1),
      });
    }

    return texturePoints;
  }, []);
  const eletricPoleStation = useMemo(() => {
    let position = [
      // p1-2
      new THREE.Vector3(-45, 0, 1.5),
      new THREE.Vector3(-35, 0, 1.5),
      new THREE.Vector3(-15, 0, 1.5),
      new THREE.Vector3(0, 0, 1.5),
      new THREE.Vector3(15, 0, 1.5),
      new THREE.Vector3(25, 0, 1.5),
      // p3-4
      new THREE.Vector3(-45, 0, 8.5),
      new THREE.Vector3(-35, 0, 8.5),
      new THREE.Vector3(-15, 0, 8.5),
      new THREE.Vector3(0, 0, 8.5),
      new THREE.Vector3(15, 0, 8.5),
      new THREE.Vector3(25, 0, 8.5),
    ];
    // for (let polePoint = -50; polePoint < 50; polePoint+15) {
    //   position.push(new THREE.Vector3(polePoint,0,0))
    // }
    return position;
  }, []);
  const eletricPoleStation1 = useMemo(() => {
    let position = [
      new THREE.Vector3(-45, 0, -16),
      new THREE.Vector3(-35, 0, -16),
      new THREE.Vector3(-15, 0, -16),
      new THREE.Vector3(0, 0, -16),
      new THREE.Vector3(15, 0, -16),
      new THREE.Vector3(25, 0, -16),
    ];
    // for (let polePoint = -50; polePoint < 50; polePoint+15) {
    //   position.push(new THREE.Vector3(polePoint,0,0))
    // }
    return position;
  }, []);

  const eletricPoleOnCurve = useMemo(() => {
    return [
      // line 4
      {
        position: new THREE.Vector3(-120, 0, 9.2),
        rotation: new THREE.Euler(0, -Math.PI, 0),
      },
      {
        position: new THREE.Vector3(-140, 0, 23),
        rotation: new THREE.Euler(0, -Math.PI+0.5, 0),
      },
      {
        position: new THREE.Vector3(-160, 0, 49.8),
        rotation: new THREE.Euler(0, -Math.PI+1, 0),
      },
      {
        position: new THREE.Vector3(-172, 0, 80),
        rotation: new THREE.Euler(0, -Math.PI+1, 0),
      },
      {
        position: new THREE.Vector3(-179.5, 0, 120),
        rotation: new THREE.Euler(0, -Math.PI+1, 0),
      },
      {
        position: new THREE.Vector3(-177, 0, 180),
        rotation: new THREE.Euler(0, -Math.PI+1.5, 0),
      },
      {
        position: new THREE.Vector3(-167, 0, 220),
        rotation: new THREE.Euler(0, -Math.PI+2, 0),
      },
      {

        position: new THREE.Vector3(-147, 0, 260),
        rotation: new THREE.Euler(0, -Math.PI+2, 0),
      },


      {
        position: new THREE.Vector3(-161, 0, 220),
        rotation: new THREE.Euler(0, Math.PI/2, 0),
      },
      {

        position: new THREE.Vector3(-142, 0, 260),
        rotation: new THREE.Euler(0, Math.PI/2, 0),
      },
      // line 7
      {
        position: new THREE.Vector3(-120, 0, 22),
        rotation: new THREE.Euler(0, 0, 0),
      },
      {
        position: new THREE.Vector3(-140, 0, 38),
        rotation: new THREE.Euler(0, 0.2, 0),
      },
      {
        position: new THREE.Vector3(-154, 0, 60),
        rotation: new THREE.Euler(0, 0.3, 0),
      },
      {
        position: new THREE.Vector3(-165.5, 0, 90),
        rotation: new THREE.Euler(0, 0.3, 0),
      },
      {
        position: new THREE.Vector3(-170.8, 0, 120),
        rotation: new THREE.Euler(0, 0.3, 0),
      },
      {
        position: new THREE.Vector3(-172.5, 0, 150),
        rotation: new THREE.Euler(0, 1.5, 0),
      },
      {
        position: new THREE.Vector3(-170.3, 0, 180),
        rotation: new THREE.Euler(0, 1.5, 0),
      },
   
      // line 3
     
     
      {
        position: new THREE.Vector3(148, 0, -180),
        rotation: new THREE.Euler(0, -Math.PI-0.5, 0),
      },
      {
        position: new THREE.Vector3(120, 0, -198),
        rotation: new THREE.Euler(0, -Math.PI, 0),
      },

      //line 2
      {
        position: new THREE.Vector3(150, 0, 0.6),
        rotation: new THREE.Euler(0, -Math.PI+0.5, 0),
      },
      {
        position: new THREE.Vector3(148, 0, -10.5),
        rotation: new THREE.Euler(0, -Math.PI+0.8, 0),
      },
      {
        position: new THREE.Vector3(170, 0, -27),
        rotation: new THREE.Euler(0, Math.PI+1, 0),
      },

      {
        position: new THREE.Vector3(168.5, 0, -14.6),
        rotation: new THREE.Euler(0, -Math.PI+0.6, 0),
      },
      //near old station[-40, 0, 320]
      
      // {
      //   position: new THREE.Vector3(-160, 0, 260),
      //   rotation: new THREE.Euler(0, -Math.PI, 0),
      // },
      // {
      //   position: new THREE.Vector3(-160, 0, 273),
      //   rotation: new THREE.Euler(0, -Math.PI, 0),
      // },

      {
        position: new THREE.Vector3(-128, 0, 281),
        rotation: new THREE.Euler(0, -Math.PI/2+0.4, 0),
      },

      {
        position: new THREE.Vector3(-128.5, 0, 276),
        rotation: new THREE.Euler(0, -Math.PI-0.2, 0),
      },

    ];
  }, []);

  const eletricPoleYard = useMemo(() => {
    let position = [
      // Happa - Yard
      // new THREE.Vector3(300, 0, 10.5),
      // new THREE.Vector3(320, 0, 10.5),
      new THREE.Vector3(340, 0, 10.3),
      new THREE.Vector3(360, 0, 10.3),
      new THREE.Vector3(380, 0, 10.3),
      new THREE.Vector3(400, 0, 10.3),
      new THREE.Vector3(420, 0, 10.3),
      new THREE.Vector3(440, 0, 10.3),
      new THREE.Vector3(460, 0, 10.3),
      new THREE.Vector3(480, 0, 10.3),
    ];

    return position;
  }, []);

  const grassPositions = useMemo(() => {
    const positions = [];
    const numDryGrass = 100;
    const numMultipleGrass = 150;
    const minX = 200, maxX = 900;
    const minZ = -trackWidth - 25, maxZ = trackWidth + 25;

    for (let i = 0; i < numDryGrass + numMultipleGrass; i++) {
      const x = Math.random() * (maxX - minX) + minX;
      let z = Math.random() * (maxZ - minZ) + minZ;

      if (Math.abs(z) <= trackWidth + 5) {
        z = z < 5 ? z - 0 : z + 20;
      }

      positions.push({ position: [x, 0, z], isMultipleGrass: i >= numDryGrass });
    }

    return positions;
  }, [trackWidth]);
  const curvegrassPositions = useMemo(() => {
    const positions = [];
    const numDryGrass = 100;
    const numMultipleGrass = 150;
    const minX = 100, maxX = 300;
    const minZ = -trackWidth - 25, maxZ = trackWidth + 25;

    for (let i = 0; i < numDryGrass + numMultipleGrass; i++) {
      const x = Math.random() * (maxX - minX) + minX;
      let z = Math.random() * (maxZ - minZ) + minZ;

      if (Math.abs(z) <= trackWidth + 5) {
        z = z < 5 ? z - 0 : z + 20;
      }

      positions.push({ position: [x, 0, z], isMultipleGrass: i >= numDryGrass });
    }

    return positions;
  }, [trackWidth]);

  return (
    <RigidBody colliders={false} type="fixed">
      {/* {
        tec.map((pos, i) => {
          return <TrackTexture key={"tec" + i} position={pos.position} scale={pos.scale} rotation={pos.rotation} />
        }
        )
      } */}
        <PoleInstances>
          {eletricPoleOnCurve.map((pole, ix) => (
            <PoleModel
              key={ix}
              position={pole.position}
              rotation={pole.rotation}
            />
          ))}
        </PoleInstances>
        <group />
    
      {eletricPoleStation.map((pos, i) => {
        return (
          <StationPole
            key={"electricPole" + i}
            scale={[0.3, 0.25, 0.4]}
            position={pos}
          />
        );
      })}

      {eletricPoleStation1.map((pos, i) => {
        return (
          <StationPole1
            key={"electricPole1" + i}
            scale={[0.3, 0.25, 0.2]}
            position={[pos.x, pos.y, pos.z + 30]}
            rotation={[0, 0, 0]}
          />
        );
      })}
      {eletricPoleYard.map((pos, i) => {
        return (
          <PoleNewModel4
            key={"electricPole" + i}
            scale={[0.3, 0.25, 0.5]}
            position={pos}
          />
        );
      })}

      {deadEndPotion.map((pos, i) => {
        return (
          <DeadEndModel
            key={i}
            scale={0.04}
            position={pos.position}
            rotation={pos.rotation}
          ></DeadEndModel>
        );
      })}
      {paths.map((props, i) => {
        return (
          <RailPath
            {...props}
            key={i}
            ref={railPaths ? railPaths[i] : null}
            baseColor={baseColor}
            normal={normal}
            height={height}
          />
        );
      })}
      {grassPositions.map((item, index) =>
        item.isMultipleGrass ? (
          <MultipleGrassModel key={`multiple-${index}`} position={item.position} scale={0.007} />
        ) : (
          <GrassModel key={`dry-${index}`} position={item.position} scale={0.5} />
        )
      )}
      {/* {curvegrassPositions.map((item, index) =>
        item.isMultipleGrass ? (
          <MultipleGrassModel key={`multiple-${index}`} position={item.position} scale={0.007} />
        ) : (
          <GrassModel key={`dry-${index}`} position={item.position} scale={0.5} />
        )
      )} */}
      {signals.map((signal, index) => (
        <group key={index}>
          {/* Render Signal */}
          <Signal {...signal} />

          {/* Conditionally Render GrassDrySingle */}
          {!excludedSignalsForGrassDrySingle.includes(signal.label) && (
            <>
              <GrassDrySingle
                scale={0.25}
                position={signal.position
                  .clone()
                  .add(
                    new THREE.Vector3(
                      ...(grassDrySinglePositionOverrides[signal.label] || [
                        0.5, 0, -1,
                      ])
                    )
                  )}
              />
              <GrassDrySingle
                scale={0.25}
                position={signal.position
                  .clone()
                  .add(
                    new THREE.Vector3(
                      ...(grassDrySinglePositionOverrides[signal.label] || [
                        0.5, 0, -1.1,
                      ])
                    )
                  )}
              />
            </>
          )}
        </group>
      ))}
      {trackEnds.map((props, i) => {
        return <TrackEnd {...props} key={i} />;
      })}
    </RigidBody>
  );
}
