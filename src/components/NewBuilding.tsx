import { Model as NewApartmentModel } from '../models/building/NewApartmentModel';
import { Model as NewBuildingModel } from '../models/building/NewBuildingModel';
import { Model as PanelHouseModel } from '../models/building/PanelHouseModel';
import { Model as TallGreenModel } from '../models/trees/tall_green_model';
import { GroupProps } from '@react-three/fiber';
import React, { useMemo } from "react";

export const NewApartment: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewApartmentModel />
        </group>
    );
});

export const NewBuilding: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <NewBuildingModel />
        </group>
    );
});

export const PanelHouse: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <PanelHouseModel />
        </group>
    );
});

export const TallGreen: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <TallGreenModel />
        </group>
    );
});