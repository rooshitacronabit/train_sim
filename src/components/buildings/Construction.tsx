import { GroupProps } from '@react-three/fiber';
import { Model } from '../../models/ConstructionModel';
import React, { useMemo } from "react";

export const Construction: React.FC<GroupProps> = React.memo((props) => {
    const memoizedProps = useMemo(() => props, [props]);
    return (
        <group {...memoizedProps}>
            <Model scale={[0.3, 0.3, 0.3]} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
});
