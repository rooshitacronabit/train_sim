import { Model } from '../models/WareHouse.tsx';
import { GroupProps } from '@react-three/fiber';
import React, { useMemo } from "react";

export const WareHouse: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model />
        </group>
    )
});