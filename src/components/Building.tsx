import { useMemo } from "react";
import * as THREE from "three";

import { Buildings } from "./buildings/Buildings";
import { IndianShop } from "./buildings/IndianShop";
import { SmallHouse } from "./buildings/SmallHouse";
import { Construction } from "./buildings/Construction";
import { CityBlockBuilding } from "./buildings/Buildings";
import { CityBuilding } from "./buildings/Buildings";
import { BuildingWhite,BuildingWhite2,StationBuilding2 } from "./buildings/Buildings";
import {
    StationBuilding,
    StationBuildings,
  } from "./buildings/StationBuilding.tsx";

  
export function Building(data) {
    const buildingPositions = useMemo(() => {
        return [
            // {
            //     position: new THREE.Vector3(350, 0, -140),
            //     rotation: new THREE.Euler(0, 0.4, 0),
            //     scale: new THREE.Vector3(1, 1, 1),
            //     group: 1
            // },
            // {
            //     position: new THREE.Vector3(400, 0, -160),
            //     rotation: new THREE.Euler(0, 0.4, 0),
            //     scale: new THREE.Vector3(1, 1, 1),
            //     group: 1
            // },
            // {
            //     position: new THREE.Vector3(450, 0, -180),
            //     rotation: new THREE.Euler(0, 0.4, 0),
            //     scale: new THREE.Vector3(1, 1, 1),
            //     group: 2
            // },
            {
                position: new THREE.Vector3(800, 0, -35), // Custom position for CityBlockBuilding and CityBuilding
                rotation: new THREE.Euler(0, Math.PI / 2, 0),
                scale: new THREE.Vector3(2, 2, 2),
                group: "custom"
            },
            {
                position: new THREE.Vector3(-40, 0, -250), // Custom position for CityBlockBuilding and CityBuilding
                rotation: new THREE.Euler(0, -3.18, 0),
                scale: new THREE.Vector3(2, 2, 2),
                group: "station"
            },
            {
                position: new THREE.Vector3(50, 0, -15), // Custom position for CityBlockBuilding and CityBuilding
                rotation: new THREE.Euler(0, Math.PI / 1.85, 0),
                scale: new THREE.Vector3(4, 4, 4),
                group: "station2"
            },
        ];
    }, []);

    const renderGroup = (pos, ix) => {
        if (pos.group === "custom") {
            return (
                <group key={ix + "-custom-group"} position={pos.position} rotation={pos.rotation} scale={pos.scale}>
                    <BuildingWhite2 key={ix + "-city-buildings"} position={[7, 0, -45]} scale={1} />
                </group>
            );
        }
        if (pos.group === "station") {
            return (
                <group key={ix + "-custom-group"} position={pos.position} rotation={pos.rotation} scale={pos.scale}>
                    <BuildingWhite key={ix + "-city-buildings"} position={[-4, 0, 0]} rotation={[0, -1.7, 0]} scale={2} />
                </group>
            );
        }
        if (pos.group === "station2") {
            return (
                <group key={ix + "-custom-group"} position={pos.position} rotation={pos.rotation} scale={pos.scale}>
                    <StationBuilding2 key={ix + "-city-buildings"} position={[0, 0, 0]} rotation={[0, -1.7, 0]} scale={2} />
                    <StationBuilding2 key={ix + "-city-buildings"} position={[-0.3, 0, 2.5]} rotation={[0, -1.7, 0]} scale={2} />
                </group>
            );
        }

        // const groups = [
        //     (
        //         <group key={ix + "-group1"} position={pos.position} rotation={pos.rotation} scale={pos.scale}>
        //             <IndianShop key={ix + "-shop"} scale={3} position={[10, 0, 0]} />
        //             <Buildings key={ix + "-building"} position={[20, 0, 0]} />
        //         </group>
        //     ),
        //     (
        //         <group key={ix + "-group2"} position={pos.position} rotation={pos.rotation} scale={pos.scale}>
        //             <SmallHouse key={ix + "-small-house"} position={[15, 0, 0]} scale={4} />
        //         </group>
        //     )
        // ];

        // return groups[pos.group - 1];
    };

    return buildingPositions.map((pos, ix) => renderGroup(pos, ix));
}
