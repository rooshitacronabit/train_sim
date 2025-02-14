import { GroupProps } from '@react-three/fiber';
import { Model as StationBuildingModel } from '../../models/building/StationBuildingModel'; // Import Model with an alias
import { Model as StationBuildingsModel } from '../../models/building/StationBuildingsgModel'; // Import another Model with an alias
import React from 'react';

// StationBuilding component
export const StationBuilding: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <StationBuildingModel scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});

// StationBuildings component
export const StationBuildings: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <StationBuildingsModel scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});
