import { GroupProps } from '@react-three/fiber';
import { Model } from '../../models/BuildingsModel';
import { Model as CityBlockModel } from '../../models/building/CityBlockModel';  
import { Model as CityBuildingModel } from '../../models/building/City_Building_Model'; 
import { Model as Building2Model } from '../../models/building/Bulding2Model'; 
import { Model as Building3Model } from '../../models/building/Bulding3Model'; 
import { Model as OldBuildingModel } from '../../models/building/Old_Building_Model'; 
import React, { useMemo } from "react";

export const Buildings: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model scale={[0.2, 0.2, 0.2]} />
        </group>
    )
});

export const CityBlockBuilding: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <CityBlockModel scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});

export const CityBuilding: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <CityBuildingModel scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});
export const BuildingWhite: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <Building2Model scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});
export const BuildingWhite2: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <Building3Model scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});

export const StationBuilding2: React.FC<GroupProps> = React.memo((props) => {
    return (
        <group {...props}>
            <OldBuildingModel scale={[0.2, 0.2, 0.2]} />
        </group>
    );
});
