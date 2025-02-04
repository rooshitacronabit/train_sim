import { GroupProps } from "@react-three/fiber";
import { Model } from "../../models/building/building_groups_model";
import { Model as RedBuildingModel } from "../../models/building/red_building_model";  
import React, { useMemo } from "react";

export const Buildings: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            {/* Default Building */}
            <Model scale={0.3} position={[0, 0, -45]} />
        </group>
    );
});

export const CityBlockBuilding: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            {/* Red Building */}
            <RedBuildingModel scale={2} position={[-40, -0.5, -40]} rotation={[0, Math.PI / -2, 0]}  />
        </group>
    );
});
