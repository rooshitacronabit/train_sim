import { GroupProps } from '@react-three/fiber';
import { Model } from '../../models/SmallHouseModel';
import React, { useMemo } from "react";

export const SmallHouse: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model scale={[0.35, 0.35, 0.35]} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
});
