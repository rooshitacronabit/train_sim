import React, { useMemo } from "react";
import {Model} from '../../models/OldRailwayStation.tsx';
import {GroupProps} from '@react-three/fiber';

export const OldStation: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model/>
        </group>
    )
});